<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Props {
  label: string
  to: string
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()


const isActive = computed(() => {
  if (route.path === props.to) return true
  
  // Solo aplica la lógica especial si este es el botón de usuarios
  if (props.to === '/usuarios') {
    const usuarioMatch = route.path.match(/^\/usuarios\/\d+$/)
    return usuarioMatch !== null
  }
  
  return false
})

const navigate = () => {
  router.push(props.to)
}
</script>

<template>
  <div
    @click="navigate"
    class="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
    :class="[
      isActive
        ? 'bg-green-100 text-green-700'
        : 'text-gray-700 hover:bg-gray-100'
    ]"
  >
    <span class="font-medium">{{ label }}</span>
  </div>
</template>
