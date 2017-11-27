import React, { Component } from 'react'
import { View, StyleSheet, SectionList, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { opportunityList } from '~/reducers/opportunityList'
import { OpportunityItem } from '~/components'
import { colors } from '~/styles'
import deepEqual from 'deep-equal'
import moment from 'moment'
import { HeaderButton } from '~/components'
import CalendarPicker from 'react-native-calendar-picker'

class OpportunityList extends Component {

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
      filteredOpportunities: [],
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

  refreshData(force=false) {
    // if (force || this.props.listenerSet === false) {
      // this.props.dispatch(fetchAndSetOpportunitiesListener())
    // }
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
      filteredOpportunities: Object.values(sections),
    })
  }

  componentWillReceiveProps(nextProps) {
    if(!deepEqual(this.props, nextProps)) {
      let events = nextProps.opportunities.sort((a, b) => a.start.localeCompare(b.start))
      this.setEvents(events)
    }
  }

  onRefresh() {
    //this.refreshData(true);
  }

  isGoing = (opportunity) => {
    if (this.props.userOpportunities) {
      if (this.props.userOpportunities[opportunity.key]) {
        return !this.props.userOpportunities[opportunity.key].resigned
      }
    }
    return false
  }

  renderItem = (opportunity) => {
    const going = this.isGoing(opportunity)
    return <OpportunityItem
      opportunity={opportunity}
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
          sections={this.state.filteredOpportunities}
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


function mapStateToProps ({ opportunityList, user }) {
  return {
    ...opportunityList,
    userOpportunities: user.opportunities
  }
}

export default connect(mapStateToProps)(OpportunityList)