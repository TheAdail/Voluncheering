import React, { Component } from 'react'
import { View, StyleSheet, SectionList, Text } from 'react-native'
import { connect } from 'react-redux'
import { eventList } from '~/reducers/eventList'
import { EventListItem } from '~/components'
import { colors } from '~/styles'
import deepEqual from 'deep-equal'
import moment from 'moment'

class MyStuff extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'My Events'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      filteredEvents: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!deepEqual(this.props, nextProps)) {
      let events = nextProps.events.sort((a, b) => a.start.localeCompare(b.start))
      events = events.filter((event) => {
        if (nextProps.userEvents) {
          if (nextProps.userEvents[event.key]) {
            return !nextProps.userEvents[event.key].resigned
          }
        }
        return false
      })
      let sections = {}
      events.forEach(event => {
        let date = moment(event.start).format('DD MMM dddd')
        if(sections[date] === undefined)
          sections[date] = {data: [], key: date}
        sections[date].data.push(event)
      })
      this.setState({
        filteredEvents: Object.values(sections),
      })
    }
  }

  onRefresh() { }

  renderItem = (event) => {
    return <EventListItem
      event={event}
      going={true}
      navigation={this.props.navigation}
    />
  }

  renderSectionHeader = (caption) => {
    return <Text style={styles.sectionHeader}>{caption}</Text>
  }

  renderSeparator() {
    return (
      <View style={styles.separator} />
    )
  }

  render() {
    return (
      <SectionList style={styles.container}
        sections={this.state.filteredEvents}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({item}) => this.renderItem(item)}
        renderSectionHeader={({section}) => this.renderSectionHeader(section.key)}
        refreshing={this.props.isFetching}
        onRefresh={this.onRefresh}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionHeader: {
    paddingLeft: 14,
    paddingTop: 4,
    height: 32,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: colors.orange,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
  },
})


function mapStateToProps ({ eventList, user }) {
  return {
    ...eventList,
    userEvents: user.events
  }
}

export default connect(mapStateToProps)(MyStuff)