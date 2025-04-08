<script setup>
// imports
import { ref } from 'vue'

//
import Icon from '@/components/base/Icon.vue'
//
import { toast } from '@/components/base/toast'
import { DropdownMenu, DropdownLink } from '@/components/base/dropdown'
import { ModalDialog, ModalConfirm } from '@/components/base/modal'
import Badge from '../components/base/Badge.vue'
import Alert from '../components/base/Alert.vue'
import Button from '../components/base/Button.vue'
import Input from '../components/base/Input.vue'
import Upload from '../components/base/Upload.vue'
import Checkbox from '../components/base/Checkbox.vue'

//props e emits

// states
// const toast = useToast()

const showModalDialog = ref(false)
const showModalConfirm = ref(false)
// Computed properties

// Métodos / funções

const showToast = value => {
  switch (value) {
    case 'success':
      return toast.success('Sucesso!', 'This is a success toast')
    case 'info':
      return toast.info('Informação!', 'This is a info toast')
    case 'warning':
      return toast.warning('Atenção!', 'This is a warning toast')
    default:
      return toast.error('Erro!', 'This is a error toast')
  }
}
</script>
<template>
  <div class="flex-1">
    <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h1 class="text-2xl font-bold">Home page</h1>
    </div>
    <div class="mt-6">
      <Button variant="primary" @click="showModalDialog = true">
        Show showModalDialog
      </Button>

      <ModalDialog :show="showModalDialog" @close="showModalDialog = false">
        <template #title>Modal Dialog</template>
        <template #content>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos,
          ex porro impedit laborum asperiores, atque possimus cupiditate ipsum
          tempore nemo, harum aliquam dicta perspiciatis veritatis libero soluta
          obcaecati unde esse.
        </template>
      </ModalDialog>
      <Button variant="danger" @click="showModalConfirm = true">
        Show showModalConfirm
      </Button>

      <ModalConfirm :show="showModalConfirm" @close="showModalConfirm = false">
        <template #title>Modal Dialog</template>
        <template #content>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos,
          ex porro impedit laborum asperiores, atque possimus cupiditate ipsum
          tempore nemo, harum aliquam dicta perspiciatis veritatis libero soluta
          obcaecati unde esse.
        </template>
      </ModalConfirm>
    </div>

    <div class="flex items-center gap-4 mt-4">
      <Button variant="outline" @click="showToast('success')">
        Show Toast Success
      </Button>
      <Button variant="outline" @click="showToast('error')">
        Show Toast Error
      </Button>
      <Button variant="outline" @click="showToast('info')">
        Show Toast Info
      </Button>
      <Button variant="outline" @click="showToast('warning')">
        Show Toast Warning
      </Button>
    </div>
    <div class="relative mt-4">
      <DropdownMenu align="left">
        <template #trigger>
          <Button variant="outline">
            Dropdown
            <Icon name="ChevronDown" class="size-5 ml-1" />
          </Button>
        </template>
        <template #content>
          <DropdownLink>Profile</DropdownLink>
          <DropdownLink>Setting</DropdownLink>
          <hr class="border border-gray-200 dark:border-gray-700 my-1" />
          <DropdownLink>Logout</DropdownLink>
        </template>
      </DropdownMenu>
    </div>

    <div class="flex items-center space-x-6 mt-6">
      <Badge type="success" message="success" />
      <Badge type="error" message="error" />
      <Badge type="info" message="info" />
      <Badge type="warning" message="warning" />
      <Badge type="default" message="default" />
    </div>
    <div class="flex items-center space-x-6 mt-6">
      <Alert
        type="success"
        message="This is a success message"
        title="success"
      />
      <Alert type="error" message="This is a error message" title="error" />
      <Alert type="info" message="This is a info message" title="info" />
      <Alert
        type="warning"
        message="This is a warning message"
        title="warning"
      />
      <Alert type="default" message="This is a default message" />
    </div>
    <div class="flex items-center space-x-4 mt-4">
      <Button variant="default">default</Button>
      <Button variant="primary">primary</Button>
      <Button variant="danger">danger</Button>
      <Button variant="outline" icon="MoveLeft" label="outline" />
      <Button variant="secondary" loading>secondary</Button>
    </div>
    <div class="flex items-center space-x-4 mt-4">
      <Button variant="default">default</Button>
      <Button variant="primary" size="sm">primary small</Button>
      <Button variant="danger" size="lg">danger large</Button>
      <Button variant="outline" square>
        <Icon name="Home" class="w-5 h-5" />
      </Button>
      <Button variant="secondary">secondary</Button>
    </div>
    <div class="grid gap-4 mb-16">
      <Input id="name" label="Name" />
      <Input id="name" label="Name" error="This is an error" />
      <Input type="select" id="gender" label="Gender">
        <option value="F">Feminino</option>
        <option value="M">Masculino</option>
      </Input>
      <Input type="textarea" id="bio" label="Bio" />

      <Upload
        id="upload-example"
        label="Comprovante"
        description="Por favor, selecione um arquivo para fazer o upload."
        error="Erro ao carregar o arquivo."
      />

      <Checkbox
        id="example-checkbox"
        label="Aceitar termos e condições"
        description="Você deve aceitar os termos e condições para continuar."
      />
    </div>
  </div>
</template>

<style scoped>
/* Apenas estilos específicos do componente */
</style>
