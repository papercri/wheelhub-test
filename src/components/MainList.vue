<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUsers } from '../composables/useUsers'
import { useUserFilters } from '../composables/useUserFilters'
import { usePagination } from '../composables/usePagination'

const router = useRouter()
const route = useRoute()

const { users, loading, loadUsers } = useUsers()
const { nameFilter, emailFilter, statusFilter, currentPage, filteredUsers } = useUserFilters(users)
const { totalPages, paginatedItems: paginatedUsers, goToPage } = usePagination(filteredUsers, currentPage)

function goToDetail(id: number) {
  router.push({
    path: `/usuarios/${id}`,
    query: route.query
  })
}

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
        <!-- Nombre -->
        <div class="relative">
          <input
            v-model="nameFilter"
            placeholder="Filtrar por nombre"
            class="input-field pr-8"
          />
          <button
            v-if="nameFilter"
            @click="nameFilter = ''"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            type="button"
          >
            &#x2715;
          </button>
        </div>

        <!-- Email -->
        <div class="relative">
          <input
            v-model="emailFilter"
            placeholder="Filtrar por email"
            class="input-field pr-8"
          />
          <button
            v-if="emailFilter"
            @click="emailFilter = ''"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            type="button"
          >
            &#x2715;
          </button>
        </div>

      <!-- Estado -->
        <div class="relative">
          <select v-model="statusFilter" class="input-field">
            <option value="all">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>
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