import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { PreSplash } from '~/components'
import { firebaseAuth } from '~/config/fire'
import AppNavigationWithState from '~/config/router'

class AppContainer extends Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.isAuthenticating === true
          ? <PreSplash />
          : <AppNavigationWithState />
        }
      </View>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticating: auth.isAuthenticating,
    isAuthed: auth.isAuthed,
  }
}

export default connect(mapStateToProps)(AppContainer)