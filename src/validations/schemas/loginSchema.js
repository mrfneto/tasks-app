import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: yup.string().required('A senha é obrigatória')
})
