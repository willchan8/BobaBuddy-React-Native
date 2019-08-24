import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// const Marker = MapView.Marker

export default class MapScreen extends Component {
  renderMarkers() {
    return this.props.screenProps.results.map((item) => (
      <Marker key={item.id} coordinate={item.coordinates} />
    ))
  }
  
  render() {
    const { latitude, longitude } = this.props.screenProps.position.coords
    return (
      <MapView
        style={styles.container}
        // provider={PROVIDER_GOOGLE}
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