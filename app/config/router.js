import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { View, Text, Platform, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TabNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation'
import { Login, WWCNform, EventList, EventDetails,
         Profile, ProfileEdit, MyStuff, SignUp, TnC } from '~/components'
import { colors } from '~/styles'
import { images } from '~/images'

const navHeader = {
  navigationOptions: {
    headerTintColor: colors.black,
  }
}

const AuthStack = StackNavigator(
  {
    WWCNform: { screen: WWCNform },
    Login: { screen: Login, navigationOptions: { header: null } },
    TnC: { screen: TnC },
    SignUp: { screen: SignUp },
  },
  {
    ...navHeader
  }
)

const EventsStack = StackNavigator(
  {
    EventList: { screen: EventList },
    EventDetails: { screen: EventDetails },
  },
  {
    ...navHeader
  }
)

const ProfileStack = StackNavigator(
  {
    Profile: { screen: Profile },
    ProfileEdit: { screen: ProfileEdit },
  },
  {
    ...navHeader
  }
)

const MyStuffStack = StackNavigator(
  {
    MyStuff: { screen: MyStuff },
    EventDetails: { screen: EventDetails },
  },
  {
    ...navHeader
  }
)

const Tabs = TabNavigator(
  {
    Events: {
      screen: EventsStack,
      navigationOptions: {
        tabBarLabel: 'Events',
        tabBarIcon: ({tintColor, focused}) => (
          <Image style={{width: 24, height: 24, tintColor: tintColor}} source={images.icList} />
        )
      }
    },
    MyStuff: {
      screen: MyStuffStack,
      navigationOptions: {
        tabBarLabel: 'My Events',
        tabBarIcon: ({tintColor, focused}) => (
          <Image style={{width: 24, height: 24, tintColor: tintColor}} source={images.icDoneAll} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor, focused}) => (
          <Image style={{width: 24, height: 24, tintColor: tintColor}} source={images.icPerson} />
        )
      }
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: colors.orange, //'#007aff',
      inactiveTintColor: '#999999',
      style: {
        backgroundColor: colors.tabsBackground
      },
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
    }
  }
)

export const AppNavigator = StackNavigator(
  {
    Auth: { screen: AuthStack },
    Home: { screen: Tabs },
  },
  {
    headerMode: 'none',
  }
)

const AppNavigationWithState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

AppNavigationWithState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppNavigationWithState)