import React from 'react'
import classes from './AnswersList.module.scss'
import AnswersItem from './answereItem/AnswereItem'

export default props => {
  return (
    <ul className={classes.AnswerList}>
      { props.answers.map((answer, index) => {
        return (
          <AnswersItem
            key={index}
            answer={answer}
            onAnswerClick={props.onAnswerClick}
            state={props.state ? props.state[answer.id] : null}
          />
        )
      })}
    </ul>
  )
}