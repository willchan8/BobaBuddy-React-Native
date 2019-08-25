import React, { Component } from 'react';
import { View, Text, Alert, Platform, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  } 


  renderMarkers() {
    return this.props.screenProps.results.map((item) => (
      <Marker 
        key={item.id} 
        coordinate={item.coordinates}
        title={`${item.name}`}
        pinColor='blue'
        onPress={() => {
          this.handlePress(item);
        }}
      />
    ))
  }

  openNavigation(item) {
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

  handlePress(item) {
    Alert.alert(
      item.name,
      'What would you like to do?',
      [
        {text: 'Open Navigation', onPress: () => this.openNavigation(item)},
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