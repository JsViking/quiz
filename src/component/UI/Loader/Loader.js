import React from 'react'
import classes from './Loader.module.scss'

export default props => {
  return (
    <div className={classes.center}>
      <div className={classes.Loader}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}