<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const title = computed(() => {
    if (route.path.startsWith('/usuarios/nuevo')) return 'Añadir Usuario'
    if (route.path.startsWith('/usuarios')) return 'Usuarios'
    if (route.path === '/') return 'Home'
    return ''
  })

</script>
<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm">
        <a href="#" class="text-gray-800 hover:text-gray-900 transition-colors">
          <font-awesome-icon icon="home" />
        </a>
        >
        <span class="text-gray-900 font-medium">{{ title }}</span>
      </nav>
    </div>
  </header>
</template>
