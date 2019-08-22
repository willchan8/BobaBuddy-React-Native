import React, { Component } from 'react'; 
import { StyleSheet, Text, View, Image, FlatList, Linking, TouchableOpacity} from 'react-native';
 
class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: this.props.navigation.getParam('response').data.businesses
    }
  }
 
  render() {
    console.log(this.state.results);
    return (
      <View>
        <Text style={styles.header}>Results</Text>
        <FlatList
          style={{marginTop: 20, marginBottom: 40}}
          data={this.state.results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={styles.resultRow} onPress={() => Linking.openURL(item.url)}>
                <Image 
                  source={{uri: item.image_url}} 
                  style={{width: 80, height: 80}} 
                />
                <View style={styles.resultDesc}>  
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
                  <Text>Rating: {item.rating} / 5</Text>
                  <Text>{`${item.location.display_address[0]}, ${item.location.city}`}</Text>
                  <Text>{(item.distance * 0.000621371).toFixed(1)} Miles Away</Text>
                </View>
              </TouchableOpacity>
            </View>)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    position: 'relative',
    top: 10,
    fontSize: 30
  },
 
  resultRow: {
    flexDirection: 'row',
    padding: 10,
  },

  resultDesc: {
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  separator: {
    height: 0.7,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
 
export default Results;