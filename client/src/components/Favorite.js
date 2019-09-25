import React, { Component } from 'react'; 
import { Alert, Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
 
class Favorite extends Component {
  constructor(props) {
    super(props)

    this.openNavigation = this.openNavigation.bind(this);
    this.unfavoriteResult = this.unfavoriteResult.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
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

  unfavoriteResult() {
    const { item, handleUnfavorite } = this.props;
    handleUnfavorite(item);
  }

  handlePress() {
    const { item } = this.props;

    Alert.alert(
      item.name,
      'What would you like to do?',
      [
        {text: 'Open Navigation', onPress: () => this.openNavigation()},
        {text: 'Remove From Favorites', onPress: () => this.unfavoriteResult()},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        
      ],
      {cancelable: false},
    );
  }

  calculateDistance(myPosition, shopPosition) {
    let lat1 = myPosition.latitude;
    let lng1 = myPosition.longitude;
    let lat2 = shopPosition.latitude;
    let lng2 = shopPosition.longitude;

    function degreesToRadians(degrees){
      return degrees * Math.PI / 180;
    }

    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLng = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLng / 2) 
            * 
            Math.sin(dLng / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = (R * c * 0.000621371).toFixed(1);

    return distance;
  }
 
  render() {
    const { position, item, favorites } = this.props;
    const favorited = favorites.some( favorite => favorite.id === item.id );

    return (
      <View>
        <TouchableOpacity style={styles.resultRow} 
          onPress={() => this.handlePress()}
        >
          <Image 
            // Yelp Fusion
            source={{uri: item.image_url}}

            // For GraphQL
            // source={{uri: item.photos[0]}}
            style={{width: 80, height: 80}} 
          />
          <View style={styles.resultDesc}>  
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name} {favorited ? <Icon name="heart" size={20} color={"red"} /> : ''}</Text>
            <Text>Rating: {item.rating} / 5 ({item.review_count} Reviews)</Text>
            <Text>{`${item.location.address1}, ${item.location.city}`}</Text>
            <Text>{this.calculateDistance(position.coords, item.coordinates)} Miles Away</Text>
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
 
export default Favorite;