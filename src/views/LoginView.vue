<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import AuthLayout from '@/components/layouts/AuthLayout.vue'
import FormLabel from '@/components/ui/FormLabel.vue'
import FormInput from '@/components/ui/FormInput.vue'
import FormError from '@/components/ui/FormError.vue'
import FormSubmit from '@/components/ui/FormSubmit.vue'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})
const error = ref(null)
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  try {
    await authStore.login(form.value)
    router.push({ name: 'home' })
  } catch (err) {
    error.value = authStore.getErrorMessage(err.code)
    console.log('Erro ao fazer login:', error)
  }
}
</script>
<template>
  <AuthLayout>
    <div class="grid text-center">
      <h1 class="heading-xl">Login</h1>
      <p class="text-balance text-muted-foreground">
        Digite seu e-mail e senha abaixo para acessar sua conta
      </p>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6">
        <div>
          <FormLabel for="email" label="E-mail" />
          <FormInput
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            v-model="form.email"
          />
        </div>
        <div>
          <FormLabel for="password" label="Senha" />
          <FormInput
            id="password"
            type="password"
            placeholder="Digite sua senha"
            v-model="form.password"
          />
        </div>
        <FormSubmit class="btn-primary w-full" :loading="loading">
          Entrar
        </FormSubmit>
      </div>
    </form>

    <div class="flex items-center justify-between">
      <a href="#" class="inline-block text-sm font-medium underline">
        Criar uma conta
      </a>

      <a href="/forgot-password" class="inline-block text-sm underline">
        Esqueceu a senha?
      </a>
    </div>

    <div class="mt-4 text-center">
      <FormError v-if="error" :message="error" class="mt-4" />
    </div>
  </AuthLayout>
</template>

<style scoped></style>
