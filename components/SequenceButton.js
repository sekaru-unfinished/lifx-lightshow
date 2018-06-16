import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native'
import randColour from 'randomcolor'

export default class ActionButton extends React.Component {
  componentWillMount() {
    this.setState({colour: randColour({luminosity: 'dark'})})
  }

  render() {
    return (
      <TouchableNativeFeedback>
        <View style={[styles.button, {backgroundColor: this.state.colour}]}>
          <Text style={{color: 'white', fontSize: 18}}>{this.props.light.label}</Text>
        </View>
      </TouchableNativeFeedback>
    )
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
