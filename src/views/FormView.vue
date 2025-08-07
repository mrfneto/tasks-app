<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'

import AppLayout from '@/components/layouts/AppLayout.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppLoader from '@/components/ui/AppLoader.vue'

import { MoveLeft } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const taskStore = useTaskStore()

const state = ref({
  loading: true,
  saving: false,
  deleting: false,
  confirmDelete: false,
  error: null
})

const form = ref({
  title: '',
  description: '',
  completed: false
})

const id = route.params.id || null

const setError = msg => {
  state.value.error = msg
}

const handleSubmit = async () => {
  state.value.error = null

  if (!form.value.title.trim()) {
    return setError('O título é obrigatório.')
  }

  state.value.saving = true
  try {
    if (id) {
      await taskStore.update(id, form.value)
    } else {
      await taskStore.create(form.value)
    }
    router.push({ name: 'home' })
  } catch (err) {
    setError(err?.message || 'Erro ao salvar a tarefa')
  } finally {
    state.value.saving = false
  }
}

const handleDelete = async () => {
  if (!id) return
  if (!state.value.confirmDelete) {
    state.value.confirmDelete = true
    setTimeout(() => (state.value.confirmDelete = false), 3000)
    return
  }

  state.value.deleting = true
  try {
    await taskStore.remove(id)
    router.push({ name: 'home' })
  } catch (err) {
    setError(err?.message || 'Erro ao excluir a tarefa')
  } finally {
    state.value.deleting = false
    state.value.confirmDelete = false
  }
}

onMounted(async () => {
  if (!id) {
    state.value.loading = false
    return
  }

  try {
    const task = await taskStore.getById(id)
    if (task) {
      form.value = {
        title: task.title,
        description: task.description || '',
        completed: task.completed || false
      }
    } else {
      setError('Tarefa não encontrada.')
    }
  } catch {
    setError('Erro ao carregar a tarefa.')
  } finally {
    state.value.loading = false
  }
})
</script>

<template>
  <AppLayout :title="id ? 'Editar Tarefa' : 'Nova Tarefa'">
    <template #actions>
      <BaseButton :to="{ name: 'home' }" variant="secondary">
        <MoveLeft class="size-4 mr-2" />
        Voltar
      </BaseButton>
    </template>

    <div class="w-full max-w-md mx-auto">
      <AppLoader v-if="state.loading" />

      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          id="title"
          label="Título"
          placeholder="Digite o título da tarefa"
          v-model="form.title"
          :disabled="state.saving"
          required
        />
        <BaseInput
          id="description"
          type="textarea"
          label="Descrição"
          placeholder="Digite a descrição da tarefa"
          v-model="form.description"
          :disabled="state.saving"
        />

        <div class="flex items-center space-x-2">
          <BaseButton :loading="state.saving" class="flex-1">
            {{ id ? 'Alterar' : 'Cadastrar' }} Tarefa
          </BaseButton>

          <BaseButton
            v-if="id"
            type="button"
            variant="secondary"
            :loading="state.deleting"
            tabindex="-1"
            @click="handleDelete"
          >
            <span v-if="state.confirmDelete" class="text-primary-500">
              Confirme exclusão
            </span>
            <span v-else class="text-red-500">Excluir Tarefa</span>
          </BaseButton>
        </div>
      </form>

      <div
        v-if="state.error"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mt-6"
      >
        <p class="text-red-700 text-sm">{{ state.error }}</p>
      </div>
    </div>
  </AppLayout>
</template>
