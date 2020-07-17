import React from 'react'
import calsses from './BackDrop.module.scss'

export default props => {
  return (
    <div 
      className={calsses.BackDrop}
      onClick={props.onClick}
    ></div>
  )
}