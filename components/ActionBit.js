import React from 'react'
import { StyleSheet, Text, View, TextInput, Picker, TouchableNativeFeedback } from 'react-native'
import { hsbToRGB, getLuminosity } from '../utils/colours'

export default class ActionBit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      light: props.lights[0].label,
      h: null,
      s: null,
      b: null,
      k: null,
      delay: null
    }
  }

  render() {
    return (
      <View style={[styles.action, {backgroundColor: 'rgb(' + this.tileColour() + ')'}]}>
        <View>
          <Text style={[styles.heading, {color: this.getTextColour()}]}>Light</Text>
          {
            this.props.action.light ? 
            <Text style={{color: this.getTextColour()}}>{this.props.action.light}</Text>
            :
            <View>
              <Picker style={{color: this.getTextColour()}} selectedValue={this.state.light} onValueChange={val => this.setState({light: val})}>
                {
                  this.props.lights.map(light => {
                    return <Picker.Item key={light.label} label={light.label} value={light.label} />
                  })
                }
              </Picker>
            </View>
          }
        </View>

        <View style={styles.colourBit}>
          <Text style={[styles.heading, {color: this.getTextColour()}]}>Colour</Text>
          {
            this.props.action.colour ? 
            <Text style={{color: this.getTextColour()}}>{this.props.action.colour}</Text> 
            :
            <View>
              {this.textInput(h => this.setState({h}), "Hue (0-360)", this.state.h)}
              {this.textInput(s => this.setState({s}), "Saturation (0-100)", this.state.s)}
              {this.textInput(b => this.setState({b}), "Brightness (0-100)", this.state.b)}
              {this.textInput(k => this.setState({k}), "Kelvin (2500-9000)", this.state.k)}
            </View>
          }
        </View>

        <View>
          <Text style={[styles.heading, {color: this.getTextColour()}]}>After</Text>
          {
            this.props.action.delay ? 
            <Text style={{color: this.getTextColour()}}>{this.props.action.delay}</Text>
            :
            <View>
              {this.textInput(delay => this.setState({delay}), "Relative to the first action (in miliseconds)", this.state.delay)}
            </View>
          }
        </View>

        {
          this.props.action.light && this.props.action.colour && this.props.action.delay ? 
          <TouchableNativeFeedback onPress={() => this.edit()}>
            <Text style={[styles.actionButton, {color: this.getTextColour()}]}>Edit</Text>
          </TouchableNativeFeedback>
          :
          <TouchableNativeFeedback onPress={() => this.save()}>
            <Text style={[styles.actionButton, {color: this.getTextColour()}]}>Save</Text>
          </TouchableNativeFeedback>
        }
      </View>
    )
  }

  textInput(onChangeText, placeholder, value) {
    return (<TextInput style={{color: this.getTextColour()}} 
                       onChangeText={onChangeText} 
                       placeholder={placeholder} 
                       value={value} 
                       keyboardType='numeric' 
                       underlineColorAndroid={this.getSoftTextColour()} 
                       placeholderTextColor={this.getSoftTextColour()} />)
  }

  checkLuminosity() {
    let rgb = this.tileColour()
    let rgbNums = [Number(rgb.split(',')[0]), Number(rgb.split(',')[1]), Number(rgb.split(',')[2])]
    return getLuminosity(rgbNums)
  }

  getTextColour() {
    return this.checkLuminosity() > 186 ? 'rgba(0, 0, 0, 1.0)' : 'rgba(255, 255, 255, 1.0)'
  }

  getSoftTextColour() {
    return this.checkLuminosity() > 186 ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.35)'
  }

  save() {
    this.props.save({
      id: this.props.action.id,
      light: this.state.light,
      colour: (this.state.h || 0) + '/' + (this.state.s || 0) + '/' + (this.state.b || 100) + '/' + (this.state.k || 9000),
      delay: this.state.delay,
      tileColour: hsbToRGB(this.state.h || 0, this.state.s || 0, this.state.b || 100)
    })
  }

  edit() {
    this.props.save({
      id: this.props.action.id,
      light: null,
      colour: null,
      delay: null,
      tileColour: hsbToRGB(this.state.h || 0, this.state.s || 0, this.state.b || 100)
    })
  }

  tileColour() {
    return this.props.action.tileColour || hsbToRGB(this.state.h || 0, this.state.s || 0, this.state.b || 100)
  }
}

const styles = StyleSheet.create({
  action: {
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 8,
    padding: 16
  },
  colourBit: {
    marginVertical: 16
  },
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  actionButton: {
    flex: 1,
    alignSelf: 'center', 
    marginTop: 12, 
    fontWeight: 'bold'
  }
})