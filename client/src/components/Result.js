import React, { Component } from 'react'; 
import { Alert, Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
 
class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.openNavigation = this.openNavigation.bind(this);
    this.saveResult = this.saveResult.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  openNavigation() {
    const { item } = this.props;
    
    const lat = item.coordinates.latitude;
    const lng = item.coordinates.longitude;

    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = `${item.location.display_address}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url); 
  }

  saveResult() {
    const { item, handleSave } = this.props;
    handleSave(item);
  }

  handlePress() {
    const { item } = this.props;

    Alert.alert(
      item.name,
      'What would you like to do?',
      [
        {text: 'Open Navigation', onPress: () => this.openNavigation()},
        {text: 'Save to Favorites', onPress: () => this.saveResult()},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        
      ],
      {cancelable: false},
    );
  }
 
  render() {
    const { item } = this.props;

    return (
      <View>
        <TouchableOpacity style={styles.resultRow} 
          onPress={() => this.handlePress()}
        >
          <Image 
            source={{uri: item.image_url}} 
            style={{width: 80, height: 80}} 
          />
          <View style={styles.resultDesc}>  
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
            <Text>Rating: {item.rating} / 5 ({item.review_count} Reviews)</Text>
            <Text>{`${item.location.display_address[0]}, ${item.location.city}`}</Text>
            <Text>{(item.distance * 0.000621371).toFixed(1)} Miles Away</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

{/* <TouchableOpacity onPress={() => Linking.openURL('maps://app?saddr=100+101&daddr=100+102')}></TouchableOpacity> */}
 
const styles = StyleSheet.create({ 
  resultRow: {
    flexDirection: 'row',
    padding: 10,
  },

  resultDesc: {
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});
 
export default Result;