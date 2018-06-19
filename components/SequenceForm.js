import React from 'react'
import { StyleSheet, View, Modal, Text, TouchableNativeFeedback, ScrollView, TextInput } from 'react-native'
import ActionBit from './ActionBit'

export default class ActionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      actions: []
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          this.props.close()
        }}>
        <View style={styles.container}>
          <Text style={styles.heading}>New Sequence</Text>

          <TextInput style={{color: 'black', marginBottom: 16}} 
                       onChangeText={t => this.setState({label: t})} 
                       placeholder='Sequence name'
                       value={this.state.label} 
                       underlineColorAndroid='rgba(0, 0, 0, 0.35)' 
                       placeholderTextColor='rgba(0, 0, 0, 0.35)' />

          <TouchableNativeFeedback onPress={() => this.newAction()}>
            <Text>+ New Action</Text>
          </TouchableNativeFeedback>

          <ScrollView style={{marginVertical: 4}}>
            {
              this.state.actions.map((action, index) => {
                return <ActionBit key={index} action={action} lights={this.props.lights} save={this.saveAction.bind(this)} />
              })
            }
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableNativeFeedback onPress={() => this.props.save(this.state)}>
              <Text>Add</Text>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => this.props.close()}>
              <Text>Close</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    )
  }

  newAction() {
    let actions = this.state.actions

    actions.push({
      id: this.guid(),
      light: null,
      colour: null,
      delay: null
    })

    this.setState({actions})
  }

  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4()
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  saveAction(action) {
    let actions = this.state.actions

    actions.forEach(a => {
      if(a.id===action.id) {
        a.light = action.light
        a.colour = action.colour
        a.delay = action.delay
        a.tileColour = action.tileColour
      }
    })

    this.setState({actions})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 24
  },
  heading: {
    fontSize: 32, 
    color: 'black',
    marginBottom: 24
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})