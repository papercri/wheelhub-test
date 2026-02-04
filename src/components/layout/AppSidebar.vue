<script setup lang="ts">
  import SidebarItem from './SidebarItem.vue'
</script>
<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <!-- Logo -->
    <div class="p-6">
      <h1 class="text-2xl font-semibold text-gray-800">wheelhub</h1>
    </div>
    
    <!-- Navigation Menu -->
    <nav class="flex-1 px-4">
      <ul class="space-y-1">
        <li><SidebarItem label="Home" to="/" /></li>
        <li><SidebarItem label="Usuarios" to="/usuarios" /></li>
        <li><SidebarItem label="Añadir Usuario" to="/usuarios/nuevo" /></li>
      </ul>
    </nav>
  </aside>
</template>

