import React, { Component } from 'react'; 
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Result from './Result';
import FilterSlider from './FilterSlider';
import SortButtons from './SortButtons';

class ResultsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      rating: 3,
    }
  }

  handleSearch = (text) => {
    this.setState({
      searchText: text,
    });
  }

  filterRating = (rating) => {
    this.setState({
      rating: rating
    });
  }
 
  render() {
    const { searchText, rating } = this.state;
    const { favorites, results, sortResultsBy, handleFavorite, handleUnfavorite, handleSort } = this.props.screenProps;

    const searchData = results.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.includes(textData) && item.rating >= rating;
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
        <SortButtons sortBy={sortResultsBy} handleSort={handleSort} screen={'results'} />
        {/* <FilterSlider filterRating={this.filterRating} rating={rating} /> */}
        <FlatList
          style={styles.list}
          data={searchData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Result style={styles.result}item={item} favorites={favorites} handleFavorite={handleFavorite} handleUnfavorite={handleUnfavorite}/>
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
    marginBottom: 113,
  },

  separator: {
    height: 0.7,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
 
export default ResultsScreen;