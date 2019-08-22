import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_KEY from './API_KEY'

export default class Home extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   header: Home
  // })
  constructor(props) {
  super(props)
    this.state = {
      position: 'unknown'
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        console.log(this.state.position.coords);
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  fetchData() {
    // var lat = this.state.position.coords.latitude;
    // var lng = this.state.position.coords.longitude;
    var lat = 37.517520;
    var lng = -121.950640;
    
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
    .then((response) => {
      this.props.navigation.push(
        'Results',
        {response: response}
      )
    })
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
});
