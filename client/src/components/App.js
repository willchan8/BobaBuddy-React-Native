import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import FavoritesScreen from "./FavoritesScreen";
import TabNavigator from "./TabNavigator";
import axios from "axios";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: null,
			positionLoading: true,
			results: [],
			defaultResults: [],
			favorites: [],
			defaultFavorites: [],
			sortResultsBy: null,
			sortFavoritesBy: null,
		};
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					position: position,
					positionLoading: false,
				});
			},
			(error) => alert(error),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 }
		);

		this.getFavorites();
	}

	saveResponse = (response) => {
		this.setState({
			results: response.data.businesses,
			defaultResults: response.data.businesses,
		});
	};

	getFavorites = () => {
		axios
			.get("https://bobabuddy.herokuapp.com/favorites")
			.then((response) => {
				this.setState({
					favorites: response.data,
					defaultFavorites: response.data,
				});
			})
			.catch((error) => alert(error));
	};

	handleFavorite = (item) => {
		axios
			.post("https://bobabuddy.herokuapp.com/favorites", { data: item })
			.then(() => {
				this.getFavorites();
			})
			.catch((error) => alert(error));
	};

	handleUnfavorite = (item) => {
		axios
			.delete("https://bobabuddy.herokuapp.com/favorites", { data: item })
			.then(() => {
				this.getFavorites();
			})
			.catch((error) => alert(error));
	};

	handleSort = (sortCriteria, screen) => {
		const {
			results,
			defaultResults,
			favorites,
			defaultFavorites,
			sortResultsBy,
			sortFavoritesBy,
		} = this.state;
		const listCopy = screen === "results" ? [...results] : [...favorites];

		const sortBy = () => {
			switch (sortCriteria) {
				case "A-Z":
					listCopy.sort((a, b) => {
						if (a.name.toLowerCase() < b.name.toLowerCase()) {
							return -1;
						}
						if (a.name.toLowerCase() > b.name.toLowerCase()) {
							return 1;
						}
						return 0;
					});
					break;
				case "Rating":
					listCopy.sort((a, b) => {
						if (a.rating > b.rating) {
							return -1;
						}
						if (a.rating < b.rating) {
							return 1;
						}
						return 0;
					});
					break;
				case "Reviews":
					listCopy.sort((a, b) => {
						if (a.review_count > b.review_count) {
							return -1;
						}
						if (a.review_count < b.review_count) {
							return 1;
						}
						return 0;
					});
					break;
				case "Distance":
					listCopy.sort((a, b) => {
						if (a.distance < b.distance) {
							return -1;
						}
						if (a.distance > b.distance) {
							return 1;
						}
						return 0;
					});
					break;
			}
		};

		if (screen === "results") {
			if (sortResultsBy === sortCriteria) {
				this.setState({
					sortResultsBy: null,
					results: defaultResults,
				});
			} else {
				this.setState({ sortResultsBy: sortCriteria }, () => {
					sortBy();
					this.setState({ results: listCopy });
				});
			}
		} else {
			if (sortFavoritesBy === sortCriteria) {
				this.setState({
					sortFavoritesBy: null,
					favorites: defaultFavorites,
				});
			} else {
				this.setState({ sortFavoritesBy: sortCriteria }, () => {
					sortBy();
					this.setState({ favorites: listCopy });
				});
			}
		}
	};

	render() {
		return (
			<AppContainer
				screenProps={{
					...this.state,
					saveResponse: this.saveResponse,
					handleFavorite: this.handleFavorite,
					handleUnfavorite: this.handleUnfavorite,
					handleSort: this.handleSort,
				}}
			/>
		);
	}
}

const AppStackNavigator = createStackNavigator(
	{
		Home: {
			screen: Home,
		},
		TabNavigator: {
			screen: TabNavigator,
			navigationOptions: {
				headerTitle: "Find Boba",
			},
		},
		FavoritesScreen: {
			screen: FavoritesScreen,
			navigationOptions: {
				headerTitle: "My Favorites",
			},
		},
	},
	{
		initialRouteName: "Home",
	}
);

const AppContainer = createAppContainer(AppStackNavigator);
