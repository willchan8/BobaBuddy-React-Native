import React, { Component } from 'react';
import { Alert, Platform, Linking, Text, View, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  renderMarkers = () => {
    return this.props.screenProps.results.map((item) => (
      <Marker 
        key={item.id} 
        coordinate={item.coordinates}
        pinColor='red'
      >
        <Callout
          onPress={() => {
            this.handlePress(item);
          }}
          style={{    
            flexDirection: 'row',
          }}
        >
          <Image 
            source={{uri: item.image_url}}
            style={{width: 70, height: 70, margin: 8}} 
          />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.name}</Text>
            <Text>Rating: {item.rating} / 5 ({item.review_count} Reviews)</Text>
            <Text>{`${item.location.address1}, ${item.location.city}`}</Text>
            {item.display_phone ? <Text>{item.display_phone}</Text> : null}
          </View>
        </Callout>
      </Marker>
    ))
  }

  openNavigation = (item) => {
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

  handlePress = (item) => {
    Alert.alert(
      item.name,
      'What would you like to do?',
      [
        {text: 'Open Navigation', onPress: () => this.openNavigation(item)},
        {text: `Call ${item.name}`, onPress: () => item.display_phone ? Linking.openURL(`tel:${item.display_phone}`) : Alert.alert('Unable to Call')},
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  
  render() {
    const { latitude, longitude } = this.props.screenProps.position.coords
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {this.renderMarkers()}
      </MapView>
    )
  }
}
const styles = {
  container: {
    flex: 1
  }
}