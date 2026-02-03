<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import MainList from './components/MainList.vue'
</script>
<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <AppSidebar />
    
    <!-- Main Content Area -->
    <div class="flex flex-col flex-1">
      <!-- Header -->
      <AppHeader />
      
      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <MainList />
      </main>

    </div>
  </div>
</template>

