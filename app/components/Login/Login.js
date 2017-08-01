import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { LoginButton } from 'react-native-fbsdk'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native'
import {
  colors,
  fontSizes,
  basicStyles,
} from '~/styles'
import {
  loginWithEmailAndPassword,
  handleAuthViaFacebook,
  setLastEmailUsed,
} from '~/actions/auth'
import { validateEmail } from '~/config/utils'

const { height } = Dimensions.get('window')

class Login extends Component {

  state = {
    email: '',
    password: '',
    logging: false,
    isShowingPassword: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastEmailUsed !== this.state.email)
      this.setState({email: nextProps.lastEmailUsed})
  }

  clearEmail = () => {
    this.props.dispatch(setLastEmailUsed(''))
    this.setState({email: ''})
  }

  toggleShowPwd = () => {
    this.setState({isShowingPassword: !this.state.isShowingPassword})
  }

  handleFBLoginFinished = (error, result) => {
    if(error) {
      Alert.alert('Error logging in', error.message)
      console.warn('Error in handleLoginFinished: ', error)
    } else if(result.isCancelled === true) {
      console.log('Auth cancelled')
    } else {
      this.props.dispatch(handleAuthViaFacebook())
    }
  }

  handleSignUp = () => {
    this.props.dispatch(NavigationActions.navigate({routeName: 'TnC'}))
  }

  handleLogin = () => {
    if(!validateEmail(this.state.email)) {
      Alert.alert('Invalid e-mail address', 'Please, inform a valid one')
    } else
    if(this.state.password.trim().length < 6) {
      Alert.alert('Password too short', 'Please, inform at least 6 characters')
    } else {
      this.setState({logging: true})
      this.props.dispatch(loginWithEmailAndPassword(this.state.email, this.state.password))
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.content}>

          <View style={styles.topContainer}>
            <Image style={styles.image} source={require('../../images/logo.gif')} />
            <Text style={styles.title}>Voluncheering</Text>
          </View>

          <View style={styles.loginForm}>
            <View style={styles.inputContainer}>
              {/* <Icon name='ios-at-outline' size={24} color={colors.green} /> */}
              <TextInput
                style={styles.input}
                onChangeText={email => { this.setState({email}) }}
                value={this.state.email}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='E-mail address'
//                autoFocus={true}
                returnKeyType='next'
              />
              <TouchableOpacity onPress={this.clearEmail}>
                <Text style={styles.clearEmail}>Clear</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              {/* <Icon name='ios-key-outline' size={24} color={colors.green} /> */}
              <TextInput
                style={styles.input}
                onChangeText={password => { this.setState({password}) }}
                value={this.state.password}
                secureTextEntry={!this.state.isShowingPassword}
                placeholder='Password'
              />
              <TouchableOpacity onPress={this.toggleShowPwd}>
                <Text style={styles.showPwd}>{this.state.isShowingPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>

            {this.state.logging
              ? <View style={styles.center}>
                  <ActivityIndicator />
                </View>
              : <View style={styles.loginContainer}>
                  <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
                    <Text style={styles.loginText}>Log in</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.signUpButton} onPress={this.handleSignUp}>
                    <Text style={styles.signUpText}>Sign up with e-mail</Text>
                  </TouchableOpacity>
                  <View style={styles.socialSeparator}>
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.line} />
                  </View>
                  <View style={styles.fbLoginContainer}>
                    <LoginButton
                      readPermissions={['public_profile', 'email']}
                      style={styles.fbLoginButton}
                      onLoginFinished={this.handleFBLoginFinished}
                    />
                  </View>
                </View>
            }
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  topContainer: {
    marginTop: 48,
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.green,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  loginForm: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: (Platform.OS === 'android' ? 0 : 1),
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 17,
  },
  clearEmail: {
    color: colors.dimmedText,
    marginTop: 12,
  },
  showPwd: {
    color: colors.dimmedText,
    marginTop: 12,
  },
  loginButton: {
    ...basicStyles.button,
    marginTop: 18,
    backgroundColor: colors.green,
  },
  loginText: {
    color: colors.white,
  },
  signUpButton: {
    ...basicStyles.button,
    backgroundColor: colors.orange,
    marginTop: 8,
  },
  signUpText: {
    color: colors.white,
  },
  socialSeparator: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#DDDDDD',
    width: 320,
    position: 'absolute',
    top: '50%',
  },
  orText: {
    backgroundColor: colors.white,
    zIndex: 1,
    width: 30,
    textAlign: 'center',
    color: '#999999',
  },
  fbLoginContainer: {
    alignItems: 'center',
  },
  fbLoginButton: {
    height: 44,
    width: '100%',
    marginBottom: 16,
  },
})

function mapStateToProps ({ auth }) {
  return {
    isAuthenticating: auth.isAuthenticating,
    lastEmailUsed: auth.lastEmailUsed,
  }
}

export default connect(mapStateToProps)(Login)