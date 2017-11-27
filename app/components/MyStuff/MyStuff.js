import React, { Component } from 'react'
import { View, StyleSheet, SectionList, Text } from 'react-native'
import { connect } from 'react-redux'
import { opportunityList } from '~/reducers/opportunityList'
import { OpportunityItem } from '~/components'
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
      filteredOpportunities: [],
    }
  }

  refreshData(force=false) {
    // if (force || this.props.listenerSet === false) {
      // this.props.dispatch(fetchAndSetOpportunitiesListener())
    // }
  }

  componentWillReceiveProps(nextProps) {
    if(!deepEqual(this.props, nextProps)) {
      let opps = nextProps.opportunities.sort((a, b) => a.start.localeCompare(b.start))
      opps = opps.filter((opportunity) => {
        if (nextProps.userOpportunities) {
          if (nextProps.userOpportunities[opportunity.key]) {
            return !nextProps.userOpportunities[opportunity.key].resigned
          }
        }
        return false
      })
      let sections = {}
      opps.forEach(opp => {
        let date = moment(opp.start).format('DD MMM dddd')
        if(sections[date] === undefined)
          sections[date] = {data: [], key: date}
        sections[date].data.push(opp)
      })
      this.setState({
        filteredOpportunities: Object.values(sections),
      })
    }
  }

  onRefresh() {
    //this.refreshData(true);
  }

  renderItem = (opportunity) => {
    return <OpportunityItem
      opportunity={opportunity}
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
        sections={this.state.filteredOpportunities}
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


function mapStateToProps ({ opportunityList, user }) {
  return {
    ...opportunityList,
    userOpportunities: user.opportunities
  }
}

export default connect(mapStateToProps)(MyStuff)