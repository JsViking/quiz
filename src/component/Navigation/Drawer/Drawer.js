/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/BackDrop/BackDrop'

const links = [1,2,3]

export default class Drawer extends React.Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a>Link {link}</a>
        </li>
      )
    })
  }

  render() {
    const cls = [
      classes.Drawer
    ]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}