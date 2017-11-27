import React, { Component } from 'react'
import { View, StyleSheet, SectionList, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { eventList } from '~/reducers/eventList'
import { EventListItem } from '~/components'
import { colors } from '~/styles'
import deepEqual from 'deep-equal'
import moment from 'moment'
import { HeaderButton } from '~/components'
import CalendarPicker from 'react-native-calendar-picker'

class EventList extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Events',
    headerRight:
      <HeaderButton
        title={navigation.state.params && navigation.state.params.showCalendar ? 'Filter' : 'Calendar'}
        onPress={() => navigation.state.params.toggleCalendar()}
      />
  })

  constructor(props) {
    super(props)
    this.state = {
      filteredEvents: [],
      selectedStartDate: null,
    }
    this.onDateChange = this.onDateChange.bind(this)
  }

  componentWillMount() {
    this.props.navigation.setParams({
      showCalendar: false,
      toggleCalendar: this.toggleCalendar.bind(this)
    });
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    })
  }

  toggleCalendar() {
    this.props.navigation.setParams({
      showCalendar: !this.props.navigation.state.params.showCalendar,
      toggleCalendar: this.toggleCalendar.bind(this)
    })
  }

  setEvents(events) {
    let sections = {}
    let selectedStartDate = this.state.selectedStartDate === null ? null : moment(this.state.selectedStartDate)
    events.forEach(event => {
      let start = moment(event.start)
      if(selectedStartDate === null || start >= selectedStartDate) {
        let date = start.format('DD MMM dddd')
        if(sections[date] === undefined)
          sections[date] = {data: [], key: date}
        sections[date].data.push(event)
      }
    })
    this.setState({
      filteredEvents: Object.values(sections),
    })
  }

  componentWillReceiveProps(nextProps) {
    if(!deepEqual(this.props, nextProps)) {
      let events = nextProps.events.sort((a, b) => a.start.localeCompare(b.start))
      this.setEvents(events)
    }
  }

  onRefresh() { }

  isGoing = (event) => {
    if (this.props.userEvents) {
      if (this.props.userEvents[event.key]) {
        return !this.props.userEvents[event.key].resigned
      }
    }
    return false
  }

  renderItem = (event) => {
    const going = this.isGoing(event)
    return <EventListItem
      event={event}
      going={going}
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
    const { selectedStartDate } = this.state
    const startDate = selectedStartDate ? selectedStartDate.toString() : ''
    const showCalendar = this.props.navigation.state.params && this.props.navigation.state.params.showCalendar
    return (
      <View style={styles.container}>
        { showCalendar &&
          <CalendarPicker
            onDateChange={this.onDateChange}
          />
        }
        <SectionList style={styles.container}
          sections={this.state.filteredEvents}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => this.renderItem(item)}
          renderSectionHeader={({section}) => this.renderSectionHeader(section.key)}
          refreshing={this.props.isFetching}
          onRefresh={this.onRefresh}
        />
      </View>
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

export default connect(mapStateToProps)(EventList)