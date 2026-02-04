<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { User } from '../types/types'

const router = useRouter()
const route = useRoute()

/*  DATA  */

const users = ref<User[]>([])
const loading = ref(false)

const nameFilter = ref('')
const emailFilter = ref('')
const statusFilter = ref<'all' | 'activo' | 'inactivo'>('all')

const currentPage = ref(1)
const perPage = 10

/* FETCH  */

const loadUsers = async () => {
  loading.value = true
  const res = await fetch('http://localhost:3000/users')
  users.value = await res.json()
  loading.value = false
}

/*  FILTERS  */

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const byName = u.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    const byEmail = u.email.toLowerCase().includes(emailFilter.value.toLowerCase())
    const byStatus =
      statusFilter.value === 'all' || u.status === statusFilter.value

    return byName && byEmail && byStatus
  })
})

/*  PAGINATION  */

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredUsers.value.length / perPage))
)

const paginatedUsers = computed(() => {
  const page = Math.min(currentPage.value, totalPages.value)
  const start = (page - 1) * perPage
  return filteredUsers.value.slice(start, start + perPage)
})

function goToPage(p:number){
  currentPage.value = p
}

/* Resetea página cuando cambian los filtros */
watch([nameFilter,emailFilter,statusFilter],()=>{
  currentPage.value = 1
})

/* Sin pag invalidas */
watch(totalPages,(tp)=>{
  if(currentPage.value > tp){
    currentPage.value = 1
  }
})

/* ROUTER SYNC  */

/* lee desde URL */
watch(
  () => route.query,
  q => {
    nameFilter.value = (q.name as string) || ''
    emailFilter.value = (q.email as string) || ''
    statusFilter.value = (q.status as any) || 'all'
    currentPage.value = Number(q.page) || 1
  },
  { immediate:true }
)

/* escribe URL */
watch(
  [nameFilter,emailFilter,statusFilter,currentPage],
  ()=>{
    router.replace({
      query:{
        name: nameFilter.value || undefined,
        email: emailFilter.value || undefined,
        status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
        page: currentPage.value !== 1 ? String(currentPage.value) : undefined
      }
    })
  }
)

/* NAVIGATION */

function goToDetail(id:number){
  router.push({
    path:`/usuarios/${id}`,
    query: route.query
  })
}

/*  MOUNT  */

onMounted(loadUsers)
</script>

<template>
  <div class="h-[calc(100vh-64px)] flex flex-col">
    <div class="max-w-3xl mx-2 bg-white p-6 flex-1 flex flex-col space-y-6">

      <!-- HEADER -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          Usuarios
          <span class="text-gray-500 text-xs font-light">
            ({{ filteredUsers.length }})
          </span>
        </h1>

        <router-link to="/usuarios/nuevo" class="btn-primary">
          Añadir usuario
        </router-link>
      </div>

      <!-- FILTERS -->
      <div class="grid md:grid-cols-3 gap-4">
        <input v-model="nameFilter" placeholder="Filtrar por nombre" class="input-field"/>
        <input v-model="emailFilter" placeholder="Filtrar por email" class="input-field"/>
        <select v-model="statusFilter" class="input-field">
          <option value="all">Todos</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
      </div>

      <!-- TABLE -->
      <div v-if="loading" class="text-center py-6">Loading...</div>

      <div class="flex-1 overflow-y-auto">
        <table class="w-full border-collapse">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-2 text-left font-bold">ID</th>
              <th class="py-2 px-2 text-left font-bold">Nombre</th>
              <th class="py-2 px-2 text-left font-bold">Email</th>
              <th class="py-2 px-2 text-left font-bold">Estado</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="u in paginatedUsers"
              :key="u.id"
              @click="goToDetail(u.id)"
              class="cursor-pointer hover:bg-green-50"
            >
              <td class="py-2 px-2">{{ u.id }}</td>
              <td class="py-2 px-2">{{ u.name }}</td>
              <td class="py-2 px-2">{{ u.email }}</td>
              <td
                :class="{
                  'text-green-600': u.status==='activo',
                  'text-red-600': u.status==='inactivo'
                }"
              >
                {{ u.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION -->
      <div v-if="totalPages>1" class="flex justify-center gap-2 pt-4">
        <button
          v-for="p in totalPages"
          :key="p"
          @click="goToPage(p)"
          class="w-9 h-9 rounded-full flex items-center justify-center text-sm"
          :class="p===currentPage ? 'btn-primary':'btn-secondary'"
        >
          {{ p }}
        </button>
      </div>

    </div>
  </div>
</template>
