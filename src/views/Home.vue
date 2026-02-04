<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue'
import AppSidebar from '../components/layout/AppSidebar.vue'
import MainList from '../components/MainList.vue'
</script>
<template>
  <div class="flex h-screen bg-gray-50">
    <AppSidebar />
    <div class="flex flex-col flex-1">
      <AppHeader />
      <main class="flex-1 overflow-auto">
        <MainList />
      </main>
    </div>
  </div>
</template>