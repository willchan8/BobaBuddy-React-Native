import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class SortButtons extends Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    const { sortBy, handleSort, screen } = this.props;
    return (
      <View style={styles.buttonsRow}>
        <Text style={{fontSize: 16}}>Sort By:</Text>

        <TouchableHighlight
          style={sortBy === 'A-Z' ? styles.buttonSelect : styles.button}
          activeOpacity={1}
          underlayColor='gray'
          onPress={() => handleSort('A-Z', screen)}
        >
          <View style={styles.buttonContainer}>
            <Text style={sortBy === 'A-Z' ? styles.buttonTextSelect : styles.buttonText}>A-Z</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={sortBy === 'Rating' ? styles.buttonSelect : styles.button}
          activeOpacity={1}
          underlayColor='gray'
          onPress={() => handleSort('Rating', screen)}
        >
          <View style={styles.buttonContainer}>
            <Text style={sortBy === 'Rating' ? styles.buttonTextSelect : styles.buttonText}>Rating</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={sortBy === 'Reviews' ? styles.buttonSelect : styles.button}
          activeOpacity={1}
          underlayColor='gray'
          onPress={() => handleSort('Reviews', screen)}
        >
          <View style={styles.buttonContainer}>
            <Text style={sortBy === 'Reviews' ? styles.buttonTextSelect : styles.buttonText}>Review Count</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={sortBy === 'Distance' ? styles.buttonSelect : styles.button}
          activeOpacity={1}
          underlayColor='gray'
          onPress={() => handleSort('Distance', screen)}
        >
          <View style={styles.buttonContainer}>
            <Text style={sortBy === 'Distance' ? styles.buttonTextSelect : styles.buttonText}>Distance</Text>
          </View>
        </TouchableHighlight>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8, 
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.2)',
  },

  buttonSelect: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'rgb(37, 160, 205)',
    borderColor: 'rgba(0,0,0,0.2)',
  },

  buttonText: {
    fontSize: 15,
    color: 'black',
  },

  buttonTextSelect: {
    fontSize: 15,
    color: 'white',
  }
});