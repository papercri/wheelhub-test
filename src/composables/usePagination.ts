import { computed, watch } from 'vue'
import type { Ref } from 'vue'

export function usePagination(items: Ref<any[]>, currentPage: Ref<number>, perPage = 10) {
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(items.value.length / perPage))
  )

  const paginatedItems = computed(() => {
    const page = Math.min(currentPage.value, totalPages.value)
    const start = (page - 1) * perPage
    return items.value.slice(start, start + perPage)
  })

  const goToPage = (p: number) => {
    currentPage.value = p
  }

  // Evitar páginas inválidas
  watch(totalPages, (tp) => {
    if (currentPage.value > tp) {
      currentPage.value = 1
    }
  })

  return {
    totalPages,
    paginatedItems,
    goToPage
  }
}