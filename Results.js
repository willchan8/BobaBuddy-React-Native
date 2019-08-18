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
        <Text style= {styles.header}>Results</Text>
        <FlatList
          style={{marginTop: 100}}
          initialListSize={10}
          data={this.state.results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={styles.resultRow} onPress={() => Linking.openURL(result.url)}>
                <Image source={{uri: item.image_url}}
                style={{width: 80, height: 80, justifyContent: 'flex-start'}} />
                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                  <Text style={{fontWeight: 'bold'}}>{`${item.name}`}</Text>
                  <Text>Rating: {`${item.rating}`}</Text>
                  <Text>Address: {`${item.location.address1}`}</Text>
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
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 5,
  }
});
 
export default Results;