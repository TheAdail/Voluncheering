import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { colors, fontSizes } from '~/styles'
import { joinOpportunity, leaveOpportunity } from '~/actions/opportunity'

class OpportunityDetails extends Component {
  static navigationOptions = {
    title: 'Opportunity',
  }

  state = {
    opportunity: this.props.navigation.state.params.opportunity,
    going: this.props.navigation.state.params.going,
  }

  join() {
    this.props.dispatch(joinOpportunity(this.state.opportunity.key, this.props.authedId))
    Alert.alert(`Thanks for joining\n${this.state.opportunity.title}`)
    this.props.dispatch(NavigationActions.back())
  }

  leave() {
    this.props.dispatch(leaveOpportunity(this.state.opportunity.key, this.props.authedId))
    Alert.alert('Thanks for letting us know 👍')
    this.props.dispatch(NavigationActions.back())
  }

  render () {
    const o = this.state.opportunity
    const going = this.state.going
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} bounces={false}>
          <Text style={styles.title}>{o.title}</Text>

          <View style={styles.dateAndSpotsContainer}>
            <Text style={styles.date}>{o.date}</Text>
            <Text style={styles.date}>{o.start} - {o.finish}</Text>
          </View>

          <View style={styles.eventTypeContainer}>
            <Text style={styles.eventType}>Event kind: {o.event_type}</Text>
          </View>

           <Text style={styles.description}>{o.description}</Text>
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

export default connect(mapStateToProps)(OpportunityDetails)