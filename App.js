import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_KEY from './API_KEY'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


export default class App extends Component {
  state = {
    position: 'unknown'
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        console.log(this.state);
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  fetchData() {
    var lat = this.state.position.coords.latitude;
    var lng = this.state.position.coords.longitude;
    
    const config = {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      params: {
        term: 'boba',
        location: String(lat) + ',' + String(lng)
      }
    }

    axios.get('https://api.yelp.com/v3/businesses/search', config)
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }
    
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>BobaBuddy</Text>
        <TouchableOpacity
          style={{borderRadius: 7,padding: 10,  backgroundColor: 'rgb(37, 160, 205)'}}
          onPress={this.fetchData.bind(this)}
        >
          <Text style={{fontSize: 15}}>Find Boba!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
