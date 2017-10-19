import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, Image, StyleSheet,
  TouchableOpacity, Dimensions, Platform } from 'react-native'
import { colors, fontSizes, basicStyles } from '~/styles'
import { connect } from 'react-redux'
import { logout } from '~/actions/auth'
import { fetchUserProfile } from '~/actions/user'
import { HeaderButton } from '~/components'

//const { width } = Dimensions.get('window')

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerRight: (
      <HeaderButton
        title='Edit'
        onPress={() => { navigation.navigate('ProfileEdit') }}
      />
    )
  })

  componentDidMount() {
    // console.log('PROFILE STUFF')
    // this.props.dispatch(fetchUserProfile(this.props.profile.uid))
  }

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render() {
    const p = this.props.profile
    const avatar = p.photoURL && p.photoURL !== '' ? {uri: p.photoURL} : require('../../images/logo.gif')
    const avatarStyle = p.photoURL && p.photoURL !== '' ? null : {alignItems: 'center'}

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.avatarContainer, avatarStyle]}>
            <Image style={styles.photo} source={avatar} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.field}>{p.displayName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>e-mail</Text>
            <Text style={styles.field}>{p.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.field}>{p.dob}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.field}>{p.mobile}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>WWCN</Text>
              { p.wwcn
                ? <Text style={styles.label}>Status</Text>
                : null
              }
              { p.wwcnExpiryDate
                ? <Text style={styles.label}>Expires in</Text>
                : null
              }
            </View>
            <View style={styles.column}>
              { p.wwcn
                ? <Text style={styles.field}>{p.wwcn}</Text>
                : <Text style={styles.notInformed}>Not informed</Text>
              }
              <Text style={styles.field}>{p.wwcnStatus}</Text>
              { p.wwcnExpiryDate
                ? <Text style={styles.field}>{p.wwcnExpiryDate}</Text>
                : null
              }
            </View>
          </View>
        </ScrollView>
        <View style={styles.logoutCountainer}>
          <TouchableOpacity onPress={this.handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  row: {
    height: 42,
    marginTop: 4,
    marginBottom: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    padding: 4,
    borderColor: colors.green,
  },
  column: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    width: '100%',
    marginBottom: 16,
  },
  photo : {
    resizeMode: 'contain',
    height: 100,
  },
  label: {
    fontSize: fontSizes.secondary-2,
    color: colors.dimmedText,
    marginTop: (Platform.OS === 'android' ? -6 : -12),
    marginBottom: (Platform.OS === 'android' ? 0 : 6),
    paddingLeft: 4,
    paddingRight: 4,
  },
  field: {
    fontWeight: 'bold',
    fontSize: fontSizes.secondary,
  },
  notInformed: {
    fontSize: fontSizes.secondary-2,
    color: colors.dimmedText,
  },
  center: {
    width: '100%',
    alignItems: 'center'
  },
  logoutContainer: {

  },
  logoutButton: {
    ...basicStyles.button,
    backgroundColor: colors.red,
  },
  logoutText: {
    color: colors.background,
    fontSize: fontSizes.secondary,
  },
})

function mapStateToProps ({ user }) {
  return {
    profile: user.profile,
  }
}

export default connect(mapStateToProps)(Profile)