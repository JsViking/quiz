import React from 'react'
import classes from './FinishQuiz.module.scss'
import Button from '../UI/button/Button'
import { Link } from 'react-router-dom'

export default props => {
  const successCount = Object.keys(props.results).reduce((acc, key) => {
    if (props.results[key] === 'success') return acc + 1
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

      <p>{successCount} of {props.quiz.length}</p>
      
      <Button onClick={props.onRetry} type={'primary'}>Повторить</Button>

      <Link to="/">
        <Button type={'success'}>Перейти в список тестов</Button>
      </Link>
    </div>
  )
}