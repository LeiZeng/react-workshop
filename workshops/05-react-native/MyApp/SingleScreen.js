import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;

    return (<View>
      <Text>Hello, Navigation!</Text>
      <Button
        onPress={() => navigate('Profile')}
        title="Go To Profile"
      />
    </View>)
  }
}
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    return <Text>Hello, Profile!</Text>;
  }
}

export default StackNavigator({
  Index: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});
