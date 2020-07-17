import React from 'react'
import classes from './FinishQuiz.module.scss'

export default props => {
  return (
    <div className={classes.finishQuiz}>
      <ul>
        <li>
          <strong>1. </strong>
          question

          <i className={'fa fa-times ' + classes.error}></i>
        </li>
        <li>
          <strong>1. </strong>
          question

          <i className={'fa fa-check ' + classes.sucsses}></i>
        </li>
      </ul>

      <p>2 of 10</p>

      <button>Повторить</button>
    </div>
  )
}