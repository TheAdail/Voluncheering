import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import moment from 'moment'
import { formatDateTime, formatDate, formatTime } from '~/config/utils'
import { colors, fontFamily } from '~/styles'
import { images } from '~/images'

export default class OpportunityItem extends Component {
  static propTypes = {
    opportunity: PropTypes.object.isRequired,
    going: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  showDetails(o, date, start, finish) {
    return this.props.navigation.navigate('OpportunityDetails', {
      opportunity: {
        key: o.key,
        event_type: o.event_type,
        title: o.title,
        description: o.description,
        spots_left: o.spots_left,
        date,
        start,
        finish,
      },
      going: this.props.going
    })
  }

    render() {
    let o = this.props.opportunity

    let startDate = moment(o.start).local()
    let formatedDate

    let theDate = startDate.format('YYYY-MM-DD')
    let today = moment().format('YYYY-MM-DD')
    let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')

    let theDateWeek = moment(startDate).startOf('week').format('YYYY-MM-DD')
    let thisWeek = moment().startOf('week').format('YYYY-MM-DD')

    let date = formatDate(startDate, true)
    let start = formatTime(startDate, true)
    let finish = formatTime(moment(o.finish).local(), true)

    if (theDateWeek === thisWeek) {
      switch (startDate) {
        case (today):
          formatedDate = "TODAY"
        case (tomorrow):
          formatedDate = "TOMORROW"
        default:
          formatedDate = moment(startDate).format('dddd (ddd)')
      }
    } else {
      formatedDate = moment(startDate).format('D MMM, YYYY (ddd)')
    }

    const el = (
      <TouchableOpacity style={styles.container} onPress={() => this.showDetails(o, formatedDate, start, finish)}>
        <Text style={styles.title}>{ o.title }</Text>
        <View style={styles.bottomSection}>
          <View style={styles.infoSection}>
            <Text style={styles.time}>{ `${date}\t${start}-${finish}` }</Text>
            <Text style={styles.eventType}>{ o.event_type }</Text>
          </View>
          {
             (this.props.going === true)
             ? <Image source={images.icCheck} style={styles.greenCheck}/>
             : <View style={styles.emptyCheck} />
          }
        </View>
      </TouchableOpacity>
    )

    return el
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginLeft: 16,
    marginTop: 8,
    marginRight: 16,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: fontFamily.default,
    color: colors.title
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8
  },
  infoSection: {
    flex: 1,
    marginTop: 16,
    marginBottom: 8,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  time: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: fontFamily.default,
    color: colors.orange
  },
  eventType: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: fontFamily.default,
    color: colors.red,
  },
  spots: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: fontFamily.default,
    color: colors.orange,
    marginLeft: 32
  },
  greenCheck: {
    alignSelf: 'flex-end',
    tintColor: colors.green,
  },
  emptyCheck: {
    width: 24,
  }
})