<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue'
import AppSidebar from '../components/layout/AppSidebar.vue'

</script>
<template>

  <div class="flex h-screen bg-gray-50">
    <AppSidebar />
    <div class="flex flex-col flex-1">
      <AppHeader />
      <main class="h-full">
        <div class="flex flex-wrap justify-center items-center h-[40vh]">
        <h2 class="title-1 text-9xl w-full text-center mt-10">404</h2>
        <span class="title-1 text-4xl w-full text-center">Pagina no encontrada</span>
        <RouterLink to="/" >
            <button class="btn-primary mt-10">Volver a Inicio</button>
        </RouterLink>
            </div>
        </main>
    </div>
  </div>
</template>