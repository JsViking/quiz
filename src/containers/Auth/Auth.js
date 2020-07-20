import React, { Component } from 'react'
import classes from './Auth.module.scss'
import Buttons from '../../component/UI/button/Button'
import Input from '../../component/UI/Input/Input'
import axios from 'axios'

const API_KEY = 'AIzaSyAVZ3UI-VxAl39qvwCguGTx_lq0fV-cwqo'

export default class Auth extends Component {
  state = {
    isFormValid: true,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData)
      console.log('response', response.data)
    } catch (error) {
      console.error(error)
    }
  }

  registryHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData)
      console.log('response', response.data)
    } catch (error) {
      console.error(error)
    }
  }

  submitHandler = event => event.preventDefault()

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={index}
          value={control.value}
          type={control.type}
          label={control.label}
          errorMessage={control.errorMessage}
          valid={control.valid}
          touched={control.touched}
          shouldValidation={control.validation && Object.keys(control).length > 0}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    }) 
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}
    control.touched = true
    control.value = event.target.value
    control.valid = this.validateControl(control.value, control.validation)
    formControls[controlName] = control

    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    
    this.setState({
      formControls,
      isFormValid
    })
  }

  validateControl(value, validation) {
    if (!validation) return true

    let isValidate = true

    if (validation.required) {
      isValidate = Boolean(value.trim()) && isValidate
    }

    if (validation.email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      isValidate = re.test(String(value))
    }

    if (validation.minLength) {
      isValidate = Boolean(value.length >= validation.minLength) && isValidate
    }

    return isValidate
  }

  render () {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            {this.renderInputs()}

            <Buttons 
              type="success" 
              onClick={this.loginHandler} 
              disabled={!this.state.isFormValid}>Войти</Buttons>

            <Buttons 
              type="primary" 
              onClick={this.registryHandler} 
              disabled={!this.state.isFormValid}>Зарегистрироваться</Buttons>
          </form>
        </div>
      </div>
    )
  }
}