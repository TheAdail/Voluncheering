import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { opportunityList } from '~/reducers/opportunityList'
import { OpportunityItem } from '~/components'
import { colors } from '~/styles'
import deepEqual from 'deep-equal'

class MyStuff extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'My Opportunities'
    }
  }

  state = {
    filteredOpportunities: [],
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
      this.setState({
        filteredOpportunities: opps.slice(), // slice forces listview update
      })
    }
  }

  onRefresh() {
    this.refreshData(true);
  }

  renderItem = (opportunity) => {
    return <OpportunityItem
      opportunity={opportunity}
      going={true}
      navigation={this.props.navigation}
    />
  }

  renderSeparator() {
    return (
      <View style={styles.separator} />
    )
  }

  render() {
    return (
      <FlatList style={styles.container}
        data={this.state.filteredOpportunities}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({item}) => this.renderItem(item)}
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