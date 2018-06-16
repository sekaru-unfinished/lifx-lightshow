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
            this.state.lights.map(light => {
              return <SequenceButton key={light.label} light={light} />
            })
          }

          <SequenceForm visible={this.state.showModal} close={() => this.setState({showModal: false})} />
        </ScrollView>

        <TouchableNativeFeedback onPress={() => this.setState({showModal: true})}>
          <Text style={styles.newAction}>+ New Sequence</Text>
        </TouchableNativeFeedback>
      </View>
    )
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
