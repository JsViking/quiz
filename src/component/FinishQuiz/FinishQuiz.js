import React from 'react'
import classes from './FinishQuiz.module.scss'
import Button from '../UI/button/Button'

export default props => {
  const sucssesCount = Object.keys(props.results).reduce((acc, key) => {
    if (props.results[key] === 'sucsses') return acc + 1
    else return acc
  }, 0)

  return (
    <div className={classes.finishQuiz}>
      <ul>
        {
          props.quiz.map((res, index) => {
            const icoClass = [
              'fa',
              props.results[res.id] === 'error' ? 'fa-times' : 'fa-check',
              classes[props.results[res.id]]
            ]

            return (
              <li key={index}>
                <strong>{index + 1}</strong>. &nbsp;
                {res.question}
      
                <i className={icoClass.join(' ')}></i>
              </li>
            )
          })
        }
      </ul>

      <p>{sucssesCount} of {props.quiz.length}</p>
      
      <Button
        onClick={props.onRetry}
        type={'primary'}
      >
        Повторить
      </Button>
    </div>
  )
}