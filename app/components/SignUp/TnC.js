import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { colors, fontSizes } from '~/styles'
import { formatDate } from '~/config/utils'
import moment from 'moment'

import { logout } from '~/actions/auth'

class TnC extends Component {
  static navigationOptions = {
    title: 'Terms & Conditions',
  }

  handleAgree = () => {
    if(this.props.navigation.state.params !== undefined &&
      this.props.navigation.state.params.mustAccept) {
      // this.props.dispatch(userAcceptedTnC())
      this.props.dispatch(NavigationActions.navigate({routeName: 'Home'}))
    } else {
      this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'SignUp'}))
    }
  }

  handleDontAgree = () => {
    this.props.dispatch(logout())
  }

  render() {
    const today = formatDate(moment(), false, true)
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../images/logo.gif')} />
        </View>
        <Text>We at OBK are most grateful for your willing to volunteer with us!</Text>
        <Text></Text>
        <Text>Please, carefully read the following agreement and confirm your acceptance by clicking the "I agree" button at the end.</Text>
        <Text></Text>
        <Text style={styles.caput}>VOLUNTEER AGREEMENT</Text>
        <Text style={styles.text}>Made on {today} between <Text style={styles.bold}>Our Big Kitchen Ltd</Text> ACN 149 226 568 of 36 Flood St, Bondi NSW 2026 (Organisation), and <Text style={styles.bold}>You</Text> (Volunteer), whose details will be provided on the "Sign Up" page.</Text>

        <Text style={styles.caput}>BACKGROUND</Text>
        <Text style={styles.text}>The Volunteer has agreed to volunteer his/her services to the Organisation.</Text>
        <Text style={styles.text}>The basis upon which the Volunteer assists the Organisation is governed by the terms and conditions set out in this Agreement.</Text>

        <Text style={styles.caput}>1. ENGAGEMENT</Text>
        <Text style={styles.text}>1.1. The Volunteer will volunteer in the area[s] listed in item 1 of the Schedule (Volunteer Services) for an agreed number of hours, in consultation with the person appointed by the Organisation from time to time to manage and supervise the Volunteer (Supervisor). The initial Supervisor is the person whose name is listed in item 2 of the Schedule.</Text>
        <Text style={styles.text}>1.2. The Volunteer knows of no reason why he/she is or may be unable to or be prevented from providing any of the Volunteer Services.</Text>
        <Text style={styles.text}>1.3. The Volunteer is not the agent or representative of the Organisation in any way, nor does the Volunteer have any authority or right to assume any obligation of any kind, express or implied, on the Organisation's behalf, or to bind or commit the Organisation in any way.</Text>

        <Text style={styles.caput}>2. VOLUNTEER’S DUTIES AND RESPONSIBILITIES</Text>
        <Text style={styles.text}>2.1. The Volunteer will:</Text>
        <Text style={styles.text}>a) participate in all identity verification checks, background security checks and any other security checks that the Organisation regards as required (which may include inspecting the personal property of the Volunteer), prior to (and also during the course of) providing any of the Volunteer Services;</Text>
        <Text style={styles.text}>b) participate in all relevant induction and training;</Text>
        <Text style={styles.text}>c) behave appropriately and courteously to Organisation staff, clients, customers, service users and the public, with whom the Volunteer interacts with in the course of the Volunteer’s role;</Text>
        <Text style={styles.text}>d) use any Organisation property or equipment provided to the Volunteer for the purpose of the task designated to the Volunteer and return these to the Organisation when this Agreement is ended by the parties;</Text>
        <Text style={styles.text}>e) be responsible for safeguarding any of the Volunteer’s own property and equipment;</Text>
        <Text style={styles.text}>f) be reliable and punctual for all rostered shifts, and will notify the Supervisor as far in advance as possible if unable to attend any rostered shifts;</Text>
        <Text style={styles.text}>g) be honest in all of the Volunteer’s dealings with the Organisation; and</Text>
        <Text style={styles.text}>h) comply with all reasonable and lawful directions with respect to the Volunteer Services from the Supervisor.</Text>

        <Text style={styles.text}>2.2. The Volunteer undertakes to the Organisation that, whenever the Volunteer provides the Volunteer Services to the Organisation, the Volunteer will:</Text>
        <Text style={styles.text}>a) perform such activities as are assigned within the scope of the Volunteer Services; and</Text>
        <Text style={styles.text}>b)  act at all times in accordance with the aims and objects of the Organisation and the Volunteer's own common sense (where it is not possible to obtain prior authority).</Text>

        <Text style={styles.text}>2.3. The Volunteer agrees:</Text>
        <Text style={styles.text}>a) to being photographed or recorded for the purposes of the Organisations’ advertising and promotional activities, and that these recordings will be and remain the property of the Organisation;</Text>
        <Text style={styles.text}>b) to allow the Organisation to use the photographs and recordings referred to in clause 2.3.a) for advertising and promotional activities;</Text>
        <Text style={styles.text}>c) that the Volunteer will have no right of pre-approval of any of the photographs and recordings referred to in clause 2.3.a) and/or the manner in which they are used in advertising and promotional activities, and that the Volunteer is not entitled to payment for any such photographs or recordings or the use thereof.</Text>

        <Text style={styles.caput}>3. REMUNERATION AND EXPENSES</Text>
        <Text style={styles.text}>3.1. The Volunteer agrees and acknowledges that the Volunteer is NOT entitled to:</Text>
        <Text style={styles.text}>a) a salary, gratuity or other payment in cash or kind with respect to the Volunteer Services provided to the Organisation;</Text>
        <Text style={styles.text}>b) the benefit of any statutory entitlements applicable to any employee of the Organisation, such as annual leave, personal leave or long service leave.</Text>
        <Text style={styles.text}>3.2. The Volunteer's reasonable expenses, incurred as a result of providing the Volunteer Services, if any, may be reimbursed, at the discretion of the Organisation. Any such claim for reimbursement must be supported by receipts, vouchers or other evidence of actual payment as the Organisation may reasonably require.</Text>

        <Text style={styles.caput}>4. HEALTH AND SAFETY</Text>
        <Text style={styles.text}>The Organisation is under a duty to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees and other persons (including volunteers and members of the public) who are affected by its activities. The Volunteer therefore agrees to:</Text>
        <Text style={styles.text}>4.1. take reasonable care for the health and safety of the Volunteer and other persons who may be affected by the Volunteer's acts or omissions;</Text>
        <Text style={styles.text}>4.2. read all health and safety notices posted for volunteer staff;</Text>
        <Text style={styles.text}>4.3. ensure that he/she is fully aware of the health and safety hazards associated with performing the Volunteer Services; and</Text>
        <Text style={styles.text}>4.4. cooperate fully with the Organisation's health and safety policies and otherwise, as necessary, to enable the Organisation to perform any duty or comply with any requirement imposed by law, by all means, including:</Text>
        <Text style={styles.text}>a) performing the Volunteer Services safely and efficiently;</Text>
        <Text style={styles.text}>b) not doing anything which may injure any other person or expose any other person to risk;</Text>
        <Text style={styles.text}>c) making full and proper use of all safety and protective equipment and clothing;</Text>
        <Text style={styles.text}>d) adhering to all procedures specified by the Organisation or any instructions issued with any plant or machinery or substances used; and</Text>
        <Text style={styles.text}>e) reporting to management any actual or potentially unsafe conditions, systems of work, buildings, vehicles, plant or other equipment.</Text>

        <Text style={styles.caput}>5. AUTHORITY AND CLAIMS</Text>
        <Text style={styles.text}>5.1. Any matter requiring the authorisation by, or permission from, the Organisation, may only be validly authorised or permitted in writing by a person to whom express authority is granted by the Organisation.</Text>
        <Text style={styles.text}>5.2. The Volunteer acknowledges and agrees that he/she will have no claims of any nature whatsoever against the Organisation (including its directors, officers, employees, contractors, volunteers or agents) for any loss, damage or injury arising from or in connection with the provision of the Volunteering Services.</Text>

        <Text style={styles.caput}>6. CONFIDENTIALITY</Text>
        <Text style={styles.text}>6.1. The Volunteer acknowledges that during the course of their engagement under this Agreement that the Volunteer will have access to Confidential Information belonging to the Organisation.</Text>
        <Text style={styles.text}>6.2. The Volunteer agrees that not at any time during (except in the proper course of carrying out the Volunteer’s role) or after this Agreement has ended, whether directly or indirectly disclose to a third party or make use of any Confidential Information.</Text>
        <Text style={styles.text}>6.3. For the purposes of this Agreement, Confidential Information is defined as all the information including trade secrets, Intellectual Property, marketing and business plans, client and supplier lists, computer software applications and programs, business contacts, finance, data concerning the Organisation or any of its related entities or any client of the Organisation’s, finances, operating margins, prospect’s lists, and transactions of the Organisation, and any materials provided to the Volunteer by the Organisation, but does not include information in the public domain other than through a breach of an obligation of confidentiality.</Text>

        <Text style={styles.caput}>7. TERMINATION</Text>
        <Text style={styles.text}>Either party may terminate this Agreement at any time, with, or without, prior notice and without giving any reason for doing so.</Text>

        <Text style={styles.caput}>8. VARIATION</Text>
        <Text style={styles.text}>This Agreement is issued without alteration, deletion or erasure. By signing this Agreement the Volunteer acknowledges that no verbal variations have been or will be made to this Agreement and any variation must be made in writing and signed by both parties to this Agreement.</Text>
        <Text></Text>

        <Text style={styles.caput}>SCHEDULE</Text>
        <Text style={[styles.text, styles.bold]}>1. Description of Volunteer Services:</Text>
        <Text style={styles.text}>
          - General Kitchen Support{'\n'}
          - Event Program Assistant (both Corporate and School events){'\n'}
          - Baking Assistant{'\n'}
          - Cooking Assistant{'\n'}
          - Maintenance Support{'\n'}
          - Receptionist{'\n'}
          - Working with special needs{'\n'}
          - Special events support{'\n'}
        </Text>
        <Text style={[styles.text, styles.bold]}>2. Supervisors:</Text>
        <Text style={styles.text}>
          - George Karounis{'\n'}
          - Joseph Beckhore{'\n'}
          - Sandy Vasserman{'\n'}
          - Mordi Slavin{'\n'}
          - Shannon Cohen{'\n'}
        </Text>
        <View style={styles.center}>
          <TouchableOpacity onPress={this.handleAgree} style={styles.agreeButton}>
            <Text style={styles.agreeText}>I agree</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <TouchableOpacity onPress={this.handleDontAgree} style={styles.dontAgreeButton}>
            <Text style={styles.dontAgreeText}>I do not agree</Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    marginBottom: 16,
  },
  text: {
    flex: 1,
    fontSize: fontSizes.small,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  caput: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: fontSizes.secondary,
    marginTop: 16,
    marginBottom: 8,
  },
  center: {
    width: '100%',
    alignItems: 'center'
  },
  agreeButton: {
    height: 40,
    width: 240,
    backgroundColor: colors.green,
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    margin: 12,
  },
  agreeText: {
    color: colors.background,
    fontSize: fontSizes.secondary,
  },
  dontAgreeButton: {
    height: 40,
    width: 240,
    backgroundColor: colors.red,
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    margin: 12,
  },
  dontAgreeText: {
    color: colors.background,
    fontSize: fontSizes.secondary,
  },
})


export default connect()(TnC)