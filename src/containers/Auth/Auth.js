import React, { Component } from 'react'
import classes from './Auth.module.scss'
import Buttons from '../../component/UI/button/Button'
import Input from '../../component/UI/Input/Input'
import { connect } from 'react-redux'
import {auth} from '../../store/actions/auth.js'

class Auth extends Component {
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

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registryHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
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

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}
export default connect(null, mapDispatchToProps)(Auth)