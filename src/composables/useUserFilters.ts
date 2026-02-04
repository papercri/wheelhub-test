import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { User } from '../types/types'

export function useUserFilters(users: Ref<User[]>) {
  const route = useRoute()
  const router = useRouter()

  const nameFilter = ref('')
  const emailFilter = ref('')
  const statusFilter = ref<'all' | 'activo' | 'inactivo'>('all')
  const currentPage = ref(1)

  const filteredUsers = computed(() => {
    return users.value.filter(u => {
      const byName = u.name.toLowerCase().includes(nameFilter.value.toLowerCase())
      const byEmail = u.email.toLowerCase().includes(emailFilter.value.toLowerCase())
      const byStatus = statusFilter.value === 'all' || u.status === statusFilter.value
      return byName && byEmail && byStatus
    })
  })

  // Sincronizar con URL
  watch(
    () => route.query,
    q => {
      nameFilter.value = (q.name as string) || ''
      emailFilter.value = (q.email as string) || ''
      statusFilter.value = (q.status as any) || 'all'
      currentPage.value = Number(q.page) || 1
    },
    { immediate: true }
  )

  watch(
    [nameFilter, emailFilter, statusFilter, currentPage],
    () => {
      router.replace({
        query: {
          name: nameFilter.value || undefined,
          email: emailFilter.value || undefined,
          status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
          page: currentPage.value !== 1 ? String(currentPage.value) : undefined
        }
      })
    }
  )

  // Resetear página al cambiar filtros
  watch([nameFilter, emailFilter, statusFilter], () => {
    currentPage.value = 1
  })

  return {
    nameFilter,
    emailFilter,
    statusFilter,
    currentPage,
    filteredUsers
  }
}