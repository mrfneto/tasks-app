import { ref } from 'vue'

const messages = ref([])

export function useToast() {
  const addMessage = (title, message, type = 'success') => {
    messages.value.push({ id: Date.now(), title, message, type })
    setTimeout(() => {
      messages.value.shift()
    }, 3000)
  }

  return {
    messages,
    success: (title, msg) => addMessage(title, msg, 'success'),
    error: (title, msg) => addMessage(title, msg, 'error'),
    info: (title, msg) => addMessage(title, msg, 'info'),
    warning: (title, msg) => addMessage(title, msg, 'warning')
  }
}
