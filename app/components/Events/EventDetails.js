import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { colors, fontSizes } from '~/styles'
import { joinEvent, leaveEvent } from '~/actions/event'

class EventDetails extends Component {
  static navigationOptions = {
    title: 'Event',
  }

  state = {
    event: this.props.navigation.state.params.event,
    going: this.props.navigation.state.params.going,
  }

  join() {
    this.props.dispatch(joinEvent(this.state.event.key, this.props.authedId))
    Alert.alert(`Thanks for joining\n${this.state.event.title}`)
    this.props.dispatch(NavigationActions.back())
  }

  leave() {
    this.props.dispatch(leaveEvent(this.state.event.key, this.props.authedId))
    Alert.alert('Thanks for letting us know 👍')
    this.props.dispatch(NavigationActions.back())
  }

  render () {
    const event = this.state.event
    const going = this.state.going
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} bounces={false}>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.dateAndSpotsContainer}>
            <Text style={styles.date}>{event.date}</Text>
            <Text style={styles.date}>{event.start} - {event.finish}</Text>
          </View>

          <View style={styles.eventTypeContainer}>
            <Text style={styles.eventType}>Event type: {event.event_type}</Text>
          </View>

           <Text style={styles.description}>{event.description}</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          {going
            ? <TouchableOpacity style={styles.redButton} onPress={() => this.leave()} >
                <Text style={styles.buttonTitle}>I'm not going anymore</Text>
              </TouchableOpacity>
            : <TouchableOpacity style={styles.button} onPress={() => this.join()} >
                <Text style={styles.buttonTitle}>I want to join this!</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black
  },
  eventTypeContainer: {
    marginTop: 16
  },
  eventType: {
    color: '#9b9b9b',
    fontSize: 17
  },
  dateAndSpotsContainer: {
    marginTop: 16,
  },
  date: {
    color: colors.orange,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  spots: {
    marginTop: 4,
    color: colors.orange,
    fontSize: 17,
    fontWeight: 'normal'
  },
  description: {
    marginTop: 32,
    fontWeight: 'normal',
    fontSize: 20,
  },
  center: {
    width: '100%',
    alignItems: 'center'
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    paddingTop: 16,
    marginBottom: 16,
  },
  button: {
    height: 44,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  redButton: {
    height: 44,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonTitle: {
    color: colors.background,
    fontSize: fontSizes.secondary,
  }
})

function mapStateToProps ({ auth }) {
  return {
    ...auth
  }
}

export default connect(mapStateToProps)(EventDetails)