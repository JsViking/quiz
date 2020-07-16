import React from 'react'
import classes from './AnswereItem.module.scss'

export default props => {
  const wrapperClasses = [classes.AnswereItem]

  if (props.state) {
    wrapperClasses.push(classes[props.state])
  }

  return (
    <li className={wrapperClasses.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}>
      {props.answer.text}
    </li>
  )
}