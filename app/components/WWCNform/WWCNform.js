import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { View, Text, TextInput, StyleSheet,
         TouchableOpacity, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'

import { colors, fontSizes } from '~/styles'
import { validateWWCN } from '~/config/utils'
import { updateWWCN } from '~/actions/login'
// import { signUpWithEmailPasswordAndProfile } from '~/actions/auth'

class WWCNform extends Component {
  static navigationOptions = {
      title: 'Your WWCN',
  }

  state = {
    wwcn: '',
    submitted: false,
  }

  constructor(props) {
    super(props);
    console.log(props);

    this.saveWWCN = this.saveWWCN.bind(this);
  }

//   toggleShowPwd = () => {
//     this.setState({isShowingPassword: !this.state.isShowingPassword})
//   }

//   handleError = (error) => {
//     this.setState({signingUp: false})
//     Alert.alert('Error signing up', error)
//   }

  saveWWCN() {
      this.props.dispatch(updateWWCN(this.state.wwcn));
      this.setState({ submitted: true });
  }
    
//   goToLogin = () => {
//     this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}))
//   }

  render () {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}
        viewIsInsideTabBar={true}
        >
          <Text style={styles.text}>One last step</Text>
          <Text style={styles.text}>Lorem Ipsum</Text>

          <View style={styles.row}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({wwcn: text})}
              value={this.state.wwcn}
              placeholder='Your WWC'
              keyboardType='name-phone-pad'
              returnKeyType='next'
              maxLength={8}
            />
          </View>
          <View style={styles.center}>
            {validateWWCN(this.state.wwcn)
                ? (<TouchableOpacity onPress={this.saveWWCN} style={styles.saveWWCNButton}>
                    <Text style={styles.signUpText}>Submit for approval</Text>
                </TouchableOpacity>)
                : (<View style={styles.disabledButton}>
                    <Text style={styles.signUpText}>Submit for approval</Text>
                </View>)
            }
          </View>
        
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
                
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     padding: 10
//   },
//   imageContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   image: {
//     resizeMode: 'contain',
//     height: 100,
//   },
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
//   text: {
//     marginBottom: 8,
//   },
  input: {
    flex: 1,
    height: 36,
    marginLeft: 8,
    paddingBottom: 8,
  },
//   showPwd: {
//     color: colors.dimmedText,
//     marginTop: 4,
//   },
  saveWWCNButton: {
    height: 40,
    width: 240,
    backgroundColor: colors.green,
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  },
  disabledButton: {
    height: 40,
    width: 240,
    backgroundColor: colors.gray,
    // color: colors.white,
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
  }  
//   signUpText: {
//     color: colors.background,
//     fontSize: fontSizes.secondary,
//   },
//   goBackButton: {
//     height: 40,
//     width: 240,
//     backgroundColor: colors.orange,
//     alignItems: 'center',
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 16,
//   },
//   goBackText: {
//     color: colors.background,
//     fontSize: fontSizes.secondary,
//   },
})

export default connect()(WWCNform)