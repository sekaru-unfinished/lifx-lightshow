import './shim.js'
import React from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback, ScrollView } from 'react-native'
import { Client } from 'react-native-lifx'
import SequenceButton from './components/SequenceButton'
import SequenceForm from './components/SequenceForm'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lights: [],
      sequences: [],
      showModal: false
    }

    let client = new Client()

    let lights = []
    client.on('light-new', light => {
      // get the state to get the name
      light.getState(err => {
        if(err) {
          console.warn(err)
          return
        }

        lights.push(light)
        this.setState({lights})
      })
    })

    client.init()
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.actionsContainer} style={{flex: 1}}>
          {
            this.state.sequences.map((sequence, index) => {
              return <SequenceButton key={index} sequence={sequence} lights={this.state.lights} />
            })
          }

          <SequenceForm visible={this.state.showModal} lights={this.state.lights} close={() => this.setState({showModal: false})} save={this.saveSequence.bind(this)} />
        </ScrollView>

        <TouchableNativeFeedback onPress={() => this.setState({showModal: true})}>
          <Text style={styles.newAction}>+ New Sequence</Text>
        </TouchableNativeFeedback>
      </View>
    )
  }

  saveSequence(actions) {
    let sequences = this.state.sequences
    sequences.push({
      actions: actions
    })
    this.setState({sequences: sequences, showModal: false})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actionsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  newAction: {
    color: '#fff',
    fontSize: 18,
    margin: 4
  }
})
