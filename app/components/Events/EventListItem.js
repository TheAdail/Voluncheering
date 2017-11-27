import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import moment from 'moment'
import { formatDateTime, formatDate, formatTime } from '~/config/utils'
import { colors, fontFamily } from '~/styles'
import { images } from '~/images'

export default class EventListItem extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    going: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  showDetails(o, date, start, finish) {
    return this.props.navigation.navigate('EventDetails', {
      event: {
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
    let event = this.props.event

    let startDate = moment(event.start).local()
    let finishDate = moment(event.finish).local()
    let diff = moment.duration(finishDate.diff(startDate))
    let duration = diff.asHours()
    let formatedDate

    let theDate = startDate.format('YYYY-MM-DD')
    let today = moment().format('YYYY-MM-DD')
    let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')

    let theDateWeek = moment(startDate).startOf('week').format('YYYY-MM-DD')
    let thisWeek = moment().startOf('week').format('YYYY-MM-DD')

    let date = formatDate(startDate, true)
    let start = formatTime(startDate, true)
    let finish = formatTime(moment(event.finish).local(), true)

    if (theDateWeek === thisWeek) {
      switch (startDate) {
        case (today):
          formatedDate = "TODAY"
        case (tomorrow):
          formatedDate = "TOMORROW"
        default:
          formatedDate = moment(startDate).format('D MMM dddd')
      }
    } else {
      formatedDate = moment(startDate).format('D MMM dddd')
    }

    const el = (
      <TouchableOpacity style={styles.container} onPress={() => this.showDetails(event, formatedDate, start, finish)}>
        <View style={styles.timeSection}>
          <Text style={styles.time}>{ `${start}` }</Text>
          <Text style={styles.duration}>{ `${duration}` } h</Text>
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{ event.title }</Text>
          <Text style={styles.eventType}>{ `${event.event_type}` }</Text>
        </View>
        <View style={styles.checkSection}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  timeSection: {
    width: 90,
    paddingTop: 10,
    paddingLeft: 16,
  },
  titleSection: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  checkSection: {
    padding: 8
  },
  time: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  duration: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.gray,
  },
  eventType: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.gray,
  },
  spots: {
    fontSize: 14,
    fontWeight: 'normal',
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