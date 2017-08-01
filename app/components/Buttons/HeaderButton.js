import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet, Text, Platform } from 'react-native'
import { colors } from '~/styles'

HeaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default function HeaderButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <Text style={styles.buttonTitle}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 16,
    backgroundColor: (Platform.OS === 'android' ? colors.headerButton : 'transparent'),
    color: (Platform.OS === 'android' ? colors.green : colors.black),
    marginLeft: 8,
    marginRight: 8,
    padding: 6,
  }
})