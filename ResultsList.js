import React, { Component } from 'react'; 
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Result from './Result'; 

class ResultsList extends Component {
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
          renderItem={({ item }) => <Result item={item} />}
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

  separator: {
    height: 0.7,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
 
export default ResultsList;