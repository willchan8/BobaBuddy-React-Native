import React, { Component } from 'react'; 
import { Alert, Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
 
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
    const label = `${item.name}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url); 
  }

  saveResult() {
    const { item, handleFavorite } = this.props;
    handleFavorite(item);
  }

  unsaveResult() {
    const { item, handleUnfavorite } = this.props;
    handleUnfavorite(item);
  }

  handlePress() {
    const { item, favorites } = this.props;
    const favorited = favorites.some( favorite => favorite.id === item.id );

    Alert.alert(
      item.name,
      'What would you like to do?',
      [
        {text: 'Open Navigation', onPress: () => this.openNavigation()},
        {text: favorited ? 'Remove from Favorites' : 'Add to Favorites', onPress: favorited ? () => this.unsaveResult() : () => this.saveResult()},
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
    const { item, favorites } = this.props;
    const favorited = favorites.some( favorite => favorite.id === item.id );

    return (
      <View>
        <TouchableOpacity style={styles.resultRow} 
          onPress={() => this.handlePress()}
        >
          <Image 
            source={{uri: item.photos[0]}} 
            style={{width: 80, height: 80}} 
          />
          <View style={styles.resultDesc}>  
    <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name} {favorited ? <Icon name="heart" size={20} color={"red"} /> : ''}</Text>
            <Text>Rating: {item.rating} / 5 ({item.review_count} Reviews)</Text>
            <Text>{`${item.location.address1}, ${item.location.city}`}</Text>
            <Text>{(item.distance * 0.000621371).toFixed(1)} Miles Away</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({ 
  resultRow: {
    flexDirection: 'row',
    padding: 10,
  },

  resultDesc: {
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});
 
export default Result;