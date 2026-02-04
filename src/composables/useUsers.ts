import { ref } from 'vue'
import type { User } from '../types/types'

export function useUsers() {
  const users = ref<User[]>([])
  const loading = ref(false)

  const loadUsers = async () => {
    loading.value = true
    try {
      const res = await fetch('http://localhost:3000/users')
      users.value = await res.json()
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    loadUsers
  }
}