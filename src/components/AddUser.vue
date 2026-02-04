<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type Status = 'activo' | 'inactivo'

const router = useRouter()

const name = ref('')
const email = ref('')
const status = ref<Status>('activo')

// mensajes de error
const errors = ref<{name?:string, email?:string, server?:string}>({})

const validate = () => {
  errors.value = {}

  if (!name.value.trim()) {
    errors.value.name = 'El nombre es obligatorio.'
  }
  else if (name.value.trim().length < 3) {
    errors.value.name = 'El nombre debe tener al menos 3 caracteres.'
  }

  if (!email.value.trim()) {
    errors.value.email = 'El email es obligatorio.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Email no válido.'
  }

  return Object.keys(errors.value).length === 0
}

const submit = async () => {
  if (!validate()) return

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        status: status.value
      })
    })

    if (!res.ok) {
      const data = await res.json()
      errors.value.server = data.message || 'Error al guardar el usuario.'
      return
    }

    router.push('/')
  } catch (e:any) {
    errors.value.server = 'Error de conexión con el servidor.'
    console.error(e)
  }
}
</script>

<template>
  <div class="p-8 max-w-md mx-auto space-y-4">
    <h1 class="text-2xl font-bold">Añadir usuario</h1>

    <div>
      <input v-model="name" placeholder="Nombre" class="input-field" />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <div>
      <input v-model="email" placeholder="Email" class="input-field" />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <select v-model="status" class="input-field">
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
    </div>

    <button @click="submit" class="btn-primary">Guardar</button>

    <p v-if="errors.server" class="text-red-500 text-sm mt-2">{{ errors.server }}</p>
  </div>
</template>
