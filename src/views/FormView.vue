<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import { Loader, Loader2, MoveLeft } from 'lucide-vue-next'

import AppLayout from '@/components/layouts/AppLayout.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import AppLoader from '../components/ui/AppLoader.vue'

const router = useRouter()
const route = useRoute()
const taskStore = useTaskStore()

const loading = ref(true)
const isSaving = ref(false)
const isDelenting = ref(false)
const isConfirm = ref(false)

const error = ref(null)

const form = ref({
  title: '',
  description: '',
  completed: false
})

const id = computed(() => route.params.id || null)

const handleSubmit = async () => {
  error.value = null

  if (!form.value.title.trim()) {
    error.value = 'O título é obrigatório.'
    return
  }

  isSaving.value = true

  try {
    await taskStore.save(form.value, id.value)
    router.push({ name: 'home' })
  } catch (err) {
    error.value = err.message || 'Erro ao salvar a tarefa'
  } finally {
    isSaving.value = false
  }
}

const handleDelete = async () => {
  if (!id.value) return

  if (!isConfirm.value) {
    isConfirm.value = true
    setTimeout(() => {
      isConfirm.value = false
    }, 3000)
  } else {
    isDelenting.value = true
    try {
      await taskStore.remove(id.value)
      router.push({ name: 'home' })
      isConfirm.value = false
    } catch (err) {
      error.value = err.message || 'Erro ao excluir a tarefa'
    } finally {
      isDelenting.value = false
    }
  }
}

onMounted(async () => {
  if (id.value) {
    try {
      const task = await taskStore.fetchById(id.value)
      if (task) {
        form.value = {
          title: task.title,
          description: task.description || '',
          completed: task.completed || false
        }
      } else {
        error.value = 'Tarefa não encontrada.'
      }
    } catch (err) {
      error.value = 'Erro ao carregar tarefa.'
    } finally {
      loading.value = false
    }
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
      <AppLoader v-if="loading" />
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          id="title"
          placeholder="Digite o título da tarefa"
          v-model="form.title"
          :disabled="isSaving"
          label="Título"
          required
        />
        <BaseInput
          id="description"
          type="textarea"
          placeholder="Digite a descrição da tarefa"
          v-model="form.description"
          :disabled="isSaving"
          label="Descrição"
          required
        />

        <div class="flex items-center space-x-2">
          <BaseButton :loading="isSaving" class="flex-1">
            {{ id ? 'Alterar' : 'Cadastrar' }} Tarefa
          </BaseButton>
          <BaseButton
            v-if="id"
            type="button"
            variant="secondary"
            :loading="isDelenting"
            tabindex="-1"
            @click="handleDelete"
          >
            <span v-if="isConfirm" class="text-primary-500">
              Confimar exclusão
            </span>
            <span v-else class="text-red-500">Excluir Tarefa</span>
          </BaseButton>
        </div>
      </form>

      <div
        v-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mt-6"
      >
        <p class="text-red-700 text-sm">{{ error }}</p>
      </div>
    </div>
  </AppLayout>
</template>
