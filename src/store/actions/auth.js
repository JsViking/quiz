import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'
import axios from 'axios'

const API_KEY = 'AIzaSyAVZ3UI-VxAl39qvwCguGTx_lq0fV-cwqo'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
    }

    const { data } = await axios.post(`${url}?key=${API_KEY}`, authData)

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSucces(data.idToken))
    dispatch(autoLogout(data.expiresIn))
  }
}

export function authSucces(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export function autoLogout(expiresIn) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expiresIn * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) dispatch(logout())
      else {
        dispatch(authSucces(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    } else {
      dispatch(logout())
    }
  }
}