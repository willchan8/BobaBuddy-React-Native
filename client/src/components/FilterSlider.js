import React, { Component } from 'react'; 
import { StyleSheet, Text, View, Slider } from 'react-native';

class FilterSlider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'left', alignItems: 'center', marginLeft: 5, marginRight: 5}}>
      <Text>Filter by Rating: </Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={5}
        step={1}
        value={3}
        onSlidingComplete={(rating) => this.props.filterRating(rating)}
      />
      <Text style={{position: 'absolute', right: 0}}> {this.props.rating}{this.props.rating === 5 ? ' Stars' : '+ Stars'}</Text>
      </View>
    )
  }
}

export default FilterSlider;
