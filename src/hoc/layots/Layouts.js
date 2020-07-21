import React from 'react'
import classes from './Layout.module.scss'
import ToggleMenu from '../../component/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../component/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'

class Layout extends React.Component {
  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.toggleMenuHandler}
          isAuthenticated={this.props.isAuthenticated}
        />

        <ToggleMenu
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: Boolean(state.auth.token)
  }
}

export default connect(mapStateToProps)(Layout)