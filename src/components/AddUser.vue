<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type Status = 'activo' | 'inactivo'

const router = useRouter()

const name = ref('')
const email = ref('')
const status = ref<Status>('activo')

const submit = async () => {
  await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      status: status.value
    })
  })

  router.push('/')
}
</script>

<template>
  <div class="p-8 max-w-md mx-auto space-y-4">
    <h1 class="text-2xl font-bold">Nuevo usuario</h1>

    <input v-model="name" placeholder="Name" class="border p-2 rounded w-full" />
    <input v-model="email" placeholder="Email" class="border p-2 rounded w-full" />

    <select v-model="status" class="border p-2 rounded w-full">
      <option value="activo">Activo</option>
      <option value="inactivo">Inactivo</option>
    </select>

    <button
      @click="submit"
      class="bg-black text-white px-4 py-2 rounded w-full"
    >
      Guardar
    </button>
  </div>
</template>
