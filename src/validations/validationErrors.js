export const handleValidationErrors = err => {
  if (Array.isArray(err.inner)) {
    const validationErrors = {}
    err.inner.forEach(error => {
      validationErrors[error.path] = error.message
    })
    return validationErrors
  }
}

// how to use

// const handleSubmit = async () => {
//   try {
//     await loginSchema.validate(form.value, { abortEarly: false })
//     console.log('Submitted: ', form.value)
//   } catch (error) {
//     errors.value = handleValidationErrors(error)
//     console.error('Error signing in:', err)
//   }
// }
