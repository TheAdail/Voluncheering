import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'

import { colors, fontSizes } from '~/styles'

import { logout } from '~/actions/auth'

class PreSplash extends Component {
  state = {
    rotation: new Animated.Value(0)
  }

  handleCancel = () => {
    this.props.dispatch(logout())
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(this.state.rotation, {toValue: -1, duration: 150}),
        Animated.timing(this.state.rotation, {toValue: 1, duration: 150}),
        Animated.timing(this.state.rotation, {toValue: 0, duration: 250})
      ]).start()
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  getTransform() {
    return {
      transform: [{
        rotate: this.state.rotation.interpolate({
          inputRange: [-1, 1],
          outputRange: ['-20deg', '20deg']
        })
      }]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.image, this.getTransform()]}
          source={require('../../images/logo.gif')}
        />
        <Text style={styles.message}>We are logging you in...</Text>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 300
  },
  message: {
    marginTop: 32,
    fontSize: fontSizes.secondary,
  },
  buttonContainer: {
    marginTop: 48,
    width: '100%',
    alignItems: 'center'
  },
  cancelButton: {
    height: 40,
    width: 240,
    backgroundColor: colors.red,
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  cancelText: {
    color: colors.background,
    fontSize: fontSizes.secondary,
  },
})

export default connect()(PreSplash)