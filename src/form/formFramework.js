export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}

export function validate(value, validation = null) {
  if (!validation) return true

  let isValid = true

  if (validation.required) {
    isValid = Boolean(value.trim()) && isValid
  }

  if (validation.email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    isValid = re.test(String(value))
  }

  if (validation.minLength) {
    isValid = Boolean(value.length >= validation.minLength) && isValid
  }
  
  return isValid
}

export function validateForm(formControls) {
  let isFormValid = true

  Object.keys(formControls).forEach(controlName => {
    const control = formControls[controlName]
    isFormValid = control.valid && isFormValid
  })

  return isFormValid
}