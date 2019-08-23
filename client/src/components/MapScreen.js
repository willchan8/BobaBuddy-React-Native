import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

// const Marker = MapView.Marker

export default class MapScreen extends Component {
  // renderMarkers() {
  //   return this.props.items.map((item, index) => (
  //     <Marker key={index} title={item.name} coordinate={item.coords} />
  //   ))
  // }
  
  render() {
    // const { region } = this.props
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // showsUserLocation
        // showsMyLocationButton
      >
        {/* {this.renderMarkers()} */}
      </MapView>
    )
  }
}
const styles = {
  container: {
    width: '100%',
    height: '100%'
  }
}