import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class ActionBit extends React.Component {
  render() {
    return (
      <View style={styles.action}>
        <Text>Light: {this.props.action.light}</Text>
        <Text>Colour: {this.props.action.colour}</Text>
        <Text>After: {this.props.action.delay}ms</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  action: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    padding: 4
  }
})