<script setup lang="ts">

  interface Props {
    label: string
    active?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    active: false
  })

</script>
<template>
  <a
    href="#"
    class="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors"
    :class="[
      active 
        ? 'bg-green-100 text-green-700' 
        : 'text-gray-700 hover:bg-gray-100'
    ]"
  >
    <div class="flex items-center gap-3">
      <span class="font-medium">{{ label }}</span>
    </div>

  </a>
</template>
