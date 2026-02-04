<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue'
import AppSidebar from '../components/layout/AppSidebar.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const user = ref(null)

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/users/${route.params.id}`)
  user.value = await res.json()
})

function goBack(){
  router.push({
    path:'/usuarios',
    query: route.query
  })
}
</script>
<template>

  <div class="flex h-screen bg-gray-50">
    <AppSidebar />
    <div class="flex flex-col flex-1">
      <AppHeader />
      <main class="h-full">
          <div class="p-6 max-w-xl mx-auto">
          

          <div v-if="user" class="space-y-2">
            <h1 class="text-2xl font-bold">Nombre Usuario: {{ user.name }}</h1>
            <p>Email: {{ user.email }}</p>
            <p>Estado: {{ user.status }}</p>
          </div>
          <button @click="goBack" class="btn-primary mt-10">
            Volver al listado
          </button>
        </div>
      </main>
    </div>
    </div>
</template>