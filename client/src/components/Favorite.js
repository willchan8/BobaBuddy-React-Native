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
    let lon1 = myPosition.longitude;
    let lat2 = shopPosition.latitude;
    let lon2 = shopPosition.longitude;

    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (distance > 1) {
      distance = 1;
    }
    distance = Math.acos(distance);
    distance = distance * 180/Math.PI;
    distance = distance * 60 * 1.1515 * 0.8684;

    return distance.toFixed(1);
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