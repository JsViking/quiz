import React, { Component } from 'react'
import classes from './QuizCreator.module.scss'

export default class QuizCreator extends Component {
  submitHandler = event => event.preventDefault

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={(event) => this.submitHandler}>

          </form>
        </div>
      </div>
    )
  }
}