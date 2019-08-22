import React, { Component } from 'react'; 
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity} from 'react-native';
 
class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
 
  render() {
    const { item } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.resultRow} onPress={() => Linking.openURL(item.url)}>
          <Image 
            source={{uri: item.image_url}} 
            style={{width: 80, height: 80}} 
          />
          <View style={styles.resultDesc}>  
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
            <Text>Rating: {item.rating} / 5 ({item.review_count} Reviews)</Text>
            <Text>{`${item.location.display_address[0]}, ${item.location.city}`}</Text>
            <Text>{(item.distance * 0.000621371).toFixed(1)} Miles Away</Text>
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
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});
 
export default Result;