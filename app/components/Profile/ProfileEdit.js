import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, Button, TextInput, StyleSheet,
         TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { HeaderButton } from '~/components'
import { colors, fontSizes } from '~/styles'
import { validateWWCN, validateEmail, removeEmpty } from '~/config/utils'
import { saveProfile } from '~/actions/user'
import { updateEmail, updatePassword } from '~/actions/auth'

class ProfileEdit extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Edit Profile',
      headerRight: (
        <HeaderButton
          title='Save'
          onPress={() => { params.handleSave() }}
        />
      )
    }
  }

  state = {
    displayName: '',
    dob: null,
    mobile: '',
    email: '',
    password: '',
    wwcn: '',
    isShowingPassword: false,
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.save })
  }

  componentWillReceiveProps(nextProps) {
    let profile = removeEmpty(nextProps.profile)
    this.setState({
      ...profile
    })
  }

  toggleShowPwd = () => {
    this.setState({isShowingPassword: !this.state.isShowingPassword})
  }

  handleError = (error) => {
    this.setState({signingUp: false})
    Alert.alert('Error signing up', error)
  }

  validateFields = () => {
    let result = false
    if(this.state.displayName.trim().length < 3) {
      Alert.alert('Name too short', 'Please, use at least 3 characters')
    } else
    if(!validateEmail(this.state.email)) {
      Alert.alert('Invalid e-mail address', 'Please, inform a valid one')
    } else
    if(this.state.dob === null) {
      Alert.alert('Date of Birth Required', 'Please, inform your day of birth')
    } else
    if(this.state.mobile.trim().length < 10) {
      Alert.alert('Mobile Number Required', 'Please, use at least 10 digits')
    } else
    if(!validateWWCN(this.state.wwcn)) {
      Alert.alert('Invalid WWCN', 'A valid WWCN is like 1234567V')
    } else
    if(this.state.password !== '' && this.state.password.trim().length < 6) {
      Alert.alert('Password too short', 'Please, use at least 6 characters')
    } else {
      result = true
    }
    return result
  }

  save = () => {
    if(this.validateFields()) {
      let profile = {
        ...this.props.profile,
        dob: this.state.dob,
        mobile: this.state.mobile,
        wwcn: this.state.wwcn,
      }
      if(this.state.wwcn != this.props.profile.wwcn) {
        profile = {
          ...profile,
          wwcnStatus: this.state.wwcn == '' ? null : 'Validating',
        }
      }
      if(this.props.profile.providerId === 'password') {
        profile = {
          ...profile,
          displayName: this.state.displayName,
          email: this.state.email,
        }
      }

      this.props.dispatch(saveProfile(profile))

      if(this.state.password !== '') {
        this.props.dispatch(updatePassword(this.state.password))
      }

      if(this.state.email !== this.props.profile.email) {
        this.props.dispatch(updateEmail(this.state.email))
      }

      this.props.navigation.dispatch(NavigationActions.back())
      Alert.alert('Profile Saved', 'Thanks for updating your info!')
    }
  }

  render () {
    const p = this.props.profile
    const avatar = p.photoURL && p.photoURL !== '' ? {uri: p.photoURL} : require('../../images/logo.gif')
    const avatarStyle = p.photoURL && p.photoURL !== '' ? null : {alignItems: 'center'}
    const canEdit = this.props.profile.providerId === 'password'
    const provider = this.props.profile.providerId

    return (
      <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}
      contentInset={{top: 0, left: 0, bottom: 70, right: 0}}>
        <View style={[styles.avatarContainer, avatarStyle]}>
          <Image style={styles.photo} source={avatar} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{`Full Name${canEdit ? '' : ' *'}`}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({displayName: text})}
            value={this.state.displayName}
            autoFocus={true}
            autoCorrect={false}
            returnKeyType='next'
            editable={canEdit}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{`E-mail Address${canEdit ? '' : ' *'}`}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            autoCapitalize='none'
            keyboardType='email-address'
            returnKeyType='next'
            editable={canEdit}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth</Text>
          <DatePicker
            style={{width: 90, marginTop: -6}}
            date={this.state.dob}
            minDate={moment().add(-80, 'years').toDate()}
            maxDate={moment().add(-12, 'years').toDate()}
            mode="date"
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            placeholder='Tap to select'
            customStyles={{
              dateInput: {
                borderWidth: 0,
              },
              dateText: {
                fontSize: fontSizes.secondary,
                color: 'black',
              },
            }}
            onDateChange={(date) => {this.setState({dob: date})}}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({mobile: text})}
            value={this.state.mobile}
            keyboardType='phone-pad'
            returnKeyType='next'
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Working With Children Number</Text>
          <View style={styles.row2}>
            <Text style={styles.wwc}>WWC</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({wwcn: text})}
              value={this.state.wwcn}
              keyboardType='name-phone-pad'
              returnKeyType='next'
              maxLength={8}
            />
            </View>
        </View>

        {this.props.profile.providerId === 'password'
        ? (
            <View>
              <Text style={{ textAlign: 'center', width: 270, marginTop: 32 }}>If you want to change your password, enter a new one below.</Text>
              <View style={styles.row}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.row2}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={!this.state.isShowingPassword}
                  />
                  <TouchableOpacity onPress={this.toggleShowPwd}>
                    <Text style={styles.showPwd}>{this.state.isShowingPassword ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        : <Text style={styles.cannotEdit}>* These fields cannot be changed here</Text>
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
  avatarContainer: {
    width: '100%',
    marginBottom: 16,
  },
  photo : {
    resizeMode: 'contain',
    height: 100,
  },
  row: {
    width: 320,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 8,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: (Platform.OS === 'android' ? 0 : 1),
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: fontSizes.secondary-2,
    color: colors.dimmedText,
  },
  wwc: {
    marginTop: 7,
    fontSize: fontSizes.secondary,
  },
  text: {
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 36,
    width: '100%',
  },
  showPwd: {
    color: colors.dimmedText,
  },
  cannotEdit: {
    color: colors.dimmedText,
    marginTop: 16,
  }
})

function mapStateToProps({ user }) {
  return {
    profile: user.profile,
  }
}

export default connect(mapStateToProps)(ProfileEdit)