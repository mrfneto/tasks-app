import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        u => {
          user.value = u
          resolve(u)
        },

        e => reject(e)
      )
    })
  }

  const login = payload =>
    signInWithEmailAndPassword(auth, payload.email, payload.password)
  const logout = () => signOut(auth)
  const register = payload =>
    createUserWithEmailAndPassword(auth, payload.email, payload.password)

  const getErrorMessage = errorCode => {
    const errorMessages = {
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/email-already-in-use': 'Este email já está em uso',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
      'auth/invalid-email': 'Email inválido',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde'
    }
    return errorMessages[errorCode] || 'Erro desconhecido'
  }

  return {
    user,
    login,
    logout,
    register,
    getCurrentUser,
    getErrorMessage
  }
})
