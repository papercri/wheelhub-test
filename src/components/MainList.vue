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

      <table v-else class="w-full border-collapse">
        <thead>
          <tr class="text-left border-b border-b-emerald-500">
            <th class="py-2">ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="u in filteredUsers"
            :key="u.id"
            class="border-b hover:bg-gray-50  border-b-emerald-300"
          >
            <td class="py-2">{{ u.id }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.status }}</td>
          </tr>

          <tr v-if="filteredUsers.length === 0">
            <td colspan="4" class="py-4 text-center text-gray-400">
              No hay ningún usuario con este criterio de búsqueda
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>
