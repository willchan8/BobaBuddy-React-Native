import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import HomeButtons from './HomeButtons';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    const { position, positionLoading, favorites, saveResponse, handleFavorite, handleUnfavorite } = this.props.screenProps;
    const { navigation } = this.props;
    return (
      <ImageBackground style={styles.background} source={require('../assets/boba.png')}>
        <View style={styles.container}>
          <Text style={styles.title}>BOBA BUDDY</Text>
          {
            positionLoading ? 
            <View style={{top: '13.5%'}}>
              <ActivityIndicator size="large" color="#000000" />
              <Text>Retrieving Location...</Text>
            </View> :
            <HomeButtons 
              position={position}
              favorites={favorites}
              saveResponse={saveResponse}
              handleFavorite={handleFavorite}
              handleUnfavorite={handleUnfavorite}
              navigation={navigation}
            />
          }
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    position: 'absolute',
    top: '45%',
    fontSize: 50,
    fontWeight: '700',
    letterSpacing: 2, 
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 8,
    textAlign: 'center',
    margin: 10,
  },
});
