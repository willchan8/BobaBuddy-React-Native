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
          style={{marginTop: 80}}
          initialNumToRender={10}
          data={this.state.results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={styles.resultRow} onPress={() => Linking.openURL(item.url)}>
                <Image source={{uri: item.image_url}} style={{width: 90, height: 90}} 
                />
                <View style={styles.resultDesc}>  
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
                  <Text>Rating: {item.rating} / 5 </Text>
                  <Text>{item.location.display_address[0]}</Text>
                  <Text>{`${item.location.city}, ${item.location.state} ${item.location.zip_code}`}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  header:{
    textAlign: 'center',
    position: 'relative',
    top: 60,
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
  }
});
 
export default Results;