import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, Button, TextInput, StyleSheet,
         TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'

import { colors, fontSizes } from '~/styles'
import { validateEmail } from '~/config/utils'
import { signUpWithEmailPasswordAndProfile } from '~/actions/auth'

class SignUp extends Component {
  static navigationOptions = {
      title: 'Sign Up',
  }

  state = {
    signingUp: false,
    displayName: '',
    dob: null,
    mobile: '',
    email: '',
    password: '',
    isShowingPassword: false,
  }

  toggleShowPwd = () => {
    this.setState({isShowingPassword: !this.state.isShowingPassword})
  }

  handleError = (error) => {
    this.setState({signingUp: false})
    Alert.alert('Error signing up', error)
  }

  signUp = () => {
    if(this.state.displayName.trim().length < 3) {
      Alert.alert('Name too short', 'Please, use at least 3 characters')
    } else
    if(this.state.dob === null) {
      Alert.alert('Date of Birth Required', 'Please, inform your day of birth')
    } else
    if(this.state.mobile.trim().length < 10) {
      Alert.alert('Mobile Number Required', 'Please, use at least 10 digits')
    } else
    if(!validateEmail(this.state.email)) {
      Alert.alert('Invalid e-mail address', 'Please, inform a valid one')
    } else
    if(this.state.password.trim().length < 6) {
      Alert.alert('Password too short', 'Please, use at least 6 characters')
    } else {
      this.setState({signingUp: true})

      const profile = {
        displayName: this.state.displayName,
        dob: this.state.dob,
        mobile: this.state.mobile,
        email: this.state.email,
        photoURL: '',
      }

      this.props.dispatch(signUpWithEmailPasswordAndProfile(this.state.email, this.state.password, profile, this.handleError))
    }
  }

  goToLogin = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}))
  }

  render () {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}
        viewIsInsideTabBar={true}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../images/logo.gif')} />
        </View>
        <Text style={styles.text}>You are almost there!</Text>
        <Text style={styles.text}>Please, enter your details below.</Text>

        <View style={styles.row}>
          <Icon name='ios-person-outline' size={24} color={colors.green} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({displayName: text})}
            value={this.state.displayName}
            autoFocus={true}
            autoCorrect={false}
            placeholder='Full Name'
            returnKeyType='next'
          />
        </View>

        <View style={styles.row}>
          <Icon name='ios-calendar-outline' size={24} color={colors.green} />
          <DatePicker
            style={{width: 104}}
            date={this.state.dob}
            minDate={moment().add(-80, 'years').toDate()}
            maxDate={moment().add(-12, 'years').toDate()}
            mode="date"
            placeholder="Date of birth"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                marginBottom: 12,
              },
              dateText: {
                fontSize: fontSizes.secondary,
                color: 'black',
              },
              placeholderText: {
                fontSize: fontSizes.secondary,
              },
            }}
            onDateChange={(date) => {this.setState({dob: date})}}
          />
        </View>

        <View style={styles.row}>
          <Icon name='ios-call-outline' size={24} color={colors.green} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({mobile: text})}
            value={this.state.mobile}
            keyboardType='phone-pad'
            placeholder='Mobile number'
            returnKeyType='next'
          />
        </View>

        <View style={styles.row}>
          <Icon name='ios-at-outline' size={24} color={colors.green} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder='e-mail'
            returnKeyType='next'
          />
        </View>

        <View style={styles.row}>
          <Icon name='ios-key-outline' size={24} color={colors.green} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={!this.state.isShowingPassword}
            placeholder='Password'
          />
          <TouchableOpacity onPress={this.toggleShowPwd}>
            <Text style={styles.showPwd}>{this.state.isShowingPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        {this.state.signingUp
          ? <View style={styles.center}>
              <ActivityIndicator />
            </View>
          : <View>
              <View style={styles.center}>
                <TouchableOpacity onPress={this.signUp} style={styles.signUpButton}>
                  <Text style={styles.signUpText}>Sign me up!</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.center}>
                <TouchableOpacity onPress={this.goToLogin} style={styles.goBackButton}>
                  <Text style={styles.goBackText}>Got an Account?</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    resizeMode: 'contain',
    height: 100,
  },
  row: {
    flexDirection: 'row',
    width: 320,
    height: 36,
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1,
    padding: 4,
    borderColor: colors.green,
  },
  text: {
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 36,
    marginLeft: 8,
    paddingBottom: 8,
  },
  showPwd: {
    color: colors.dimmedText,
    marginTop: 4,
  },
  signUpButton: {
    height: 40,
    width: 240,
    backgroundColor: colors.green,
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  },
  signUpText: {
    color: colors.background,
    fontSize: fontSizes.secondary,
  },
  goBackButton: {
    height: 40,
    width: 240,
    backgroundColor: colors.orange,
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  },
  goBackText: {
    color: colors.background,
    fontSize: fontSizes.secondary,
  },
})

export default connect()(SignUp)