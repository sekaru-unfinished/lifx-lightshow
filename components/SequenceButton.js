import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native'

export default class ActionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeouts: []
    }
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={() => this.go()}>
        <View style={[styles.button, {backgroundColor: this.props.sequence.colour}]}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>{this.props.sequence.label}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  go() {
    this.clearStateTimeouts()

    let timeouts = []

    this.props.sequence.actions.forEach(action => {
      let t = setTimeout(() => {
        this.getLight(action.light).on()

        let colour = action.colour.split('/')

        this.getLight(action.light).color(Number(colour[0]), Number(colour[1]), Number(colour[2]), Number(colour[3]), 50)
      }, Number(action.delay))

      timeouts.push(t)
    })

    this.setState({timeouts})
  }

  getLight(label) {
    for(let l of this.props.lights) {
      if(l.label===label) return l
    }
  }

  clearStateTimeouts() {
    this.state.timeouts.forEach(t => {
      clearTimeout(t)
    })

    this.setState({timeouts: []})
  }
}

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width/3,
    height: Dimensions.get('window').width/3,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
