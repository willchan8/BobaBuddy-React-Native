import React, { Component } from 'react'; 
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Favorite from './Favorite'; 

class FavoritesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.navigation.getParam('favorites'),
      searchText: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(text) {
    this.setState({
      searchText: text,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.navigation.getParam('favorites') !== prevProps.navigation.getParam('favorites')) {
      this.setState({favorites: this.props.navigation.getParam('favorites')});
    }
  }
 
  render() {
    const {favorites, searchText} = this.state;
    const handleUnfavorite = this.props.navigation.getParam('handleUnfavorite');

    const searchData = favorites.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.includes(textData);
    });

    return (
      <View>
        <Text style={styles.header}>My Favorites</Text>
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
            <Favorite item={item} handleUnfavorite={handleUnfavorite}/>
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
 
export default FavoritesList;