<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { User } from '../types/types.ts'

const users = ref<User[]>([])
const loading = ref(false)
const nameFilter = ref('')
const emailFilter = ref('')
const statusFilter = ref<'all' | 'activo' | 'inactivo'>('all')
const loadUsers = async () => {
  loading.value = true
  const res = await fetch('http://localhost:3000/users')
  users.value = await res.json()
  loading.value = false
}
const selectedUser = ref<User | null>(null)
const showModal = ref(false)
const openDetail = (user: User) => {
  selectedUser.value = user
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const deleteUser = async (id: number) => {
  await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE'
  })

  users.value = users.value.filter(u => u.id !== id)
}
onMounted(loadUsers)
console.log("loading:", loading.value) 
const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const byName =
      u.name.toLowerCase().includes(nameFilter.value.toLowerCase())

    const byEmail =
      u.email.toLowerCase().includes(emailFilter.value.toLowerCase())

    const byStatus =
      statusFilter.value === 'all' || u.status === statusFilter.value

    return byName && byEmail && byStatus
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-3xl mx-2 bg-white  p-6 space-y-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Usuarios <span class="text-gray-600 text-xs font-light">({{ filteredUsers.length }})</span></h1>
          <router-link
            to="/usuarios/nuevo"
            class="bg-black text-white px-4 py-2 rounded hover:opacity-80"
          >
            Añadir usuario
          </router-link>
      </div>
      <!-- Filters -->
      <div class="grid md:grid-cols-3 gap-4">
        <input
          v-model="nameFilter"
          placeholder="Filter by name"
          class="border rounded px-3 py-2 w-full"
        />

        <input
          v-model="emailFilter"
          placeholder="Filter by email"
          class="border rounded px-3 py-2 w-full"
        />

        <select
          v-model="statusFilter"
          class="border rounded px-3 py-2 w-full"
        >
          <option value="all">Todos</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
      </div>

      <!-- Table -->
      <div v-if="loading" class="text-center py-6">
        Loading...
      </div>

      <table class="w-full border-collapse">

        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-2 text-left font-bold">ID</th>
            <th class="py-2 px-2 text-left font-bold">Nombre</th>
            <th class="py-2 px-2 text-left font-bold">Email</th>
            <th class="py-2 px-2 text-left font-bold">Estado</th>
            <th class="py-2 px-2 text-right font-bold">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="u in filteredUsers"
            :key="u.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-2 px-2">{{ u.id }}</td>
            <td class="py-2 px-2">{{ u.name }}</td>
            <td class="py-2 px-2">{{ u.email }}</td>
            <td
              class="py-2 px-2 text-center rounded"
              :class="{
                'text-green-600 bg-green-100': u.status === 'activo',
                'text-red-600 bg-red-100': u.status === 'inactivo'
              }"
            >
              {{ u.status }}
            </td>
            <td class="flex gap-3 justify-end py-2 px-2">
              <button
                @click="openDetail(u)"
                class="text-sm underline text-green-900"
              >
                <font-awesome-icon icon="eye" />
              </button>

              <button
                @click="deleteUser(u.id)"
                class="text-red-500 font-bold"
              >
                <font-awesome-icon icon="xmark" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div
  v-if="showModal && selectedUser"
  class="fixed inset-0 bg-black/40 flex items-center justify-center"
>
  <div class="bg-white p-6 rounded shadow w-80 space-y-3">
    <h2 class="text-xl font-bold">Detalle usuario</h2>

    <p><b>ID:</b> {{ selectedUser.id }}</p>
    <p><b>Nombre:</b> {{ selectedUser.name }}</p>
    <p><b>Email:</b> {{ selectedUser.email }}</p>
    <p><b>Estado:</b> {{ selectedUser.status }}</p>

    <button
      @click="closeModal"
      class="mt-4 bg-black text-white px-4 py-2 rounded w-full"
    >
      Cerrar
    </button>
  </div>
</div>

</template>
