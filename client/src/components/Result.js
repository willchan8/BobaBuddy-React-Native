import React, { Component } from 'react'; 
import { Alert, Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
 
class Result extends Component {
  constructor(props) {
    super(props)
  }

  openNavigation = () => {
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

  saveResult = () => {
    const { item, handleFavorite } = this.props;
    handleFavorite(item);
  }

  unfavoriteResult = () => {
    const { item, handleUnfavorite } = this.props;
    handleUnfavorite(item);
  }

  handlePress = () => {
    const { item, favorites } = this.props;
    const favorited = favorites.some( favorite => favorite.id === item.id );

    Alert.alert(
      item.name,
      'What would you like to do?',
      [
        {text: 'Open Navigation', onPress: () => this.openNavigation()},
        {text: favorited ? 'Remove from Favorites' : 'Add to Favorites', onPress: favorited ? () => this.unfavoriteResult() : () => this.saveResult()},
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
          <View style={styles.imageAndDesc}>
            <Image 
              // Yelp Fusion
              source={{uri: item.image_url}}
              // For GraphQL
              // source={{uri: item.photos[0]}} 
              style={{width: 80, height: 80, borderRadius: 4}} 
            />
            <View style={styles.resultDesc}>  
              <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
              <Text>Rating: {item.rating} / 5 ({item.review_count} Reviews)</Text>
              <Text>{`${item.location.address1}, ${item.location.city}`}</Text>
              <Text>{(item.distance * 0.000621371).toFixed(1)} Miles Away</Text>
            </View>
          </View>
          <View>
            {favorited ? <Icon name="heart" size={20} color={"red"} /> : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({ 
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  imageAndDesc: {
    flexDirection: 'row',
  },
  resultDesc: {
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});
 
export default Result;