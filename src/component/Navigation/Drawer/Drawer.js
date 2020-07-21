/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/BackDrop/BackDrop'
import {NavLink} from 'react-router-dom'

export default class Drawer extends React.Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
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

    const links = [
      {to: '/', label: 'Список', exact: true}
    ]

    if (this.props.isAuthenticated) {
      links.push({to: '/Quiz-creator', label: 'Создать опрос', exact: false})
      links.push({to: '/logout', label: 'Выход', exact: false})
    } else {
      links.push({to: '/Auth', label: 'Авторизация', exact: false})
    }

    return (
      <React.Fragment>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}