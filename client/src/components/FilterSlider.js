import React, { Component } from 'react'; 
import { StyleSheet, Text, View, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

 export default class FilterSlider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.slider}>
        <Text>Filter by Rating:  </Text>
        <Slider
          style={{width: 190, height: 40}}
          minimumValue={1}
          maximumValue={5}
          step={0.5}
          value={3}
          onSlidingComplete={(rating) => this.props.filterRating(rating)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', right: 0, alignItems: 'center'}}>
          <Text> {this.props.rating}{this.props.rating === 5 ? ' ' : '+ '}</Text>
          <Icon name="star" color="orange" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
});