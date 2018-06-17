import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native'
import randColour from 'randomcolor'

export default class ActionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {colour: randColour({luminosity: 'dark'})}
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={() => this.go()}>
        <View style={[styles.button, {backgroundColor: this.state.colour}]}>
          <Text style={{color: 'white', fontSize: 18}}>{'hey'}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  go() {
    this.props.sequence.actions.forEach(action => {
      setTimeout(() => {
        this.getLight(action.light).on()

        let colour = action.colour.split('/')

        this.getLight(action.light).color(Number(colour[0]), Number(colour[1]), Number(colour[2]), Number(colour[3]), 100)
      }, Number(action.delay))
    })
  }

  getLight(label) {
    for(let l of this.props.lights) {
      if(l.label===label) return l
    }
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
