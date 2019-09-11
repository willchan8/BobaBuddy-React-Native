import React, { Component } from 'react'; 
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Favorite from './Favorite'; 

class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { searchText } = this.state;
    const { favorites, handleUnfavorite } = this.props.screenProps;

    const searchData = favorites.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.includes(textData);
    });

    return (
      <View>
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
            <Favorite item={item} favorites={favorites} handleUnfavorite={handleUnfavorite}/>
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

  list: {
    marginBottom: 65,
  },

  separator: {
    height: 0.7,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
 
export default FavoritesScreen;