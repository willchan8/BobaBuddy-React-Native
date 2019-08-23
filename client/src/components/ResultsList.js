import React, { Component } from 'react'; 
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Result from './Result'; 

class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.navigation.getParam('response').data.businesses,
      // currentPosition: this.props.navigation.getParam('currentPosition'),
      searchText: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(text) {
    this.setState({
      searchText: text,
    });
  }
 
  render() {
    const {results, searchText} = this.state;
    const handleSave = this.props.navigation.getParam('handleSave');

    const searchData = results.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.includes(textData);
    });

    return (
      <View>
        <Text style={styles.header}>Results</Text>
        <View style={styles.searchContainer}>
          <SearchBar
            onChangeText={this.handleSearch}
            value={searchText}
            placeholder="Search Here"
            platform="ios"
          />
        </View>  
        <FlatList
          style={styles.list}
          data={searchData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Result item={item} handleSave={handleSave}/>
          }
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
    fontSize: 30,
  },

  searchContainer: {
    top: 10,
    marginTop: 10,
    marginBottom: 10
  },

  list: {
    marginBottom: 130,
  },

  separator: {
    height: 0.7,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
 
export default ResultsList;