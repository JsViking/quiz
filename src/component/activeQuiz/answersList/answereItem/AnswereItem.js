import React from 'react'
import classes from './AnswereItem.module.scss'

export default props => {
  return (
    <li className={classes.AnswereItem}
      onClick={() => props.onAnswerClick(props.answer.id)}>
      {props.answer.text}
    </li>
  )
}