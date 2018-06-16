import React from 'react'
import { StyleSheet, View, Modal, Text, TouchableNativeFeedback, ScrollView } from 'react-native'
import ActionBit from './ActionBit'

export default class ActionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
        
          <TouchableNativeFeedback onPress={() => this.addAction()}>
            <Text>+ New Action</Text>
          </TouchableNativeFeedback>

          <ScrollView style={{marginVertical: 4}}>
            {
              this.state.actions.map((action, index) => {
                return <ActionBit key={index} action={action} />
              })
            }
          </ScrollView>

          <TouchableNativeFeedback onPress={() => this.props.close()}>
            <Text>Cancel</Text>
          </TouchableNativeFeedback>
        </View>
      </Modal>
    )
  }

  addAction() {
    let actions = this.state.actions
    actions.push({
      light: 'Bedroom Light',
      colour: '50/80/100/9000',
      delay: '100'
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
  }
})