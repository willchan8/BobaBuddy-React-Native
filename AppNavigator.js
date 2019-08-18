import React, { Component } from 'react';
import { Navigator } from 'react-native';
import App from './App';
import Results from './Results';
 
class AppNavigator extends Component {

  renderScene(route, navigator) {
    // switch(route.name) {
    //   case "App":
    //     return (
    //       <App navigator={navigator} />
    //     )
    //   case "Results":
    //     return (
    //       <Results navigator={navigator} data={route.data} />
    //     )
    // }
    if (route.name == 'App') {
      return <App navigator={navigator} />
    }
    if (route.name == 'Results') {
      return <Results navigator={navigator} data={route.data} />
    }
  }
 
  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        renderScene={this.renderScene}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
      />
    )
  }
}
 
// export default AppNavigator;