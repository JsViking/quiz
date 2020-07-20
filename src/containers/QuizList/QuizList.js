import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.scss'
import axios from '../../axios/axios-quiz'
import Loader from '../../component/UI/Loader/Loader'

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes && this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={`./quiz/${quiz.id}`}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const responce = await axios.get('quizes.json')
      const quizes = []

      Object.keys(responce.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })
      this.setState({ 
        quizes,
        loading: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {
            this.state.loading 
              ? <Loader /> 
              : <ul>
                  {this.renderQuizes()}
                </ul>
          }
        </div>
      </div>
    )
  }
}