class: middle center
# React Native
---

# Learn once write everywhere
## What's new
- It's Native, no more DOM/BOM
- Native Components
- Native APIs

## What's still
- React
- NPM/Yarn
- Node libraries like Redux/Moment etc.

---

# React is ready for cross platform



```plain




                        React Component

                              ↓

                     React Element (render)

                              ↓

                         Dom / Native
```

---

# Native Bridge
.center[
![](https://image.slidesharecdn.com/optimizing-views-160219152417/95/optimizing-react-native-views-for-preanimation-3-638.jpg)
]

---

# Quick start

```bash
$ npm install -g react-native-cli

$ react-native init SimpleApp
$ cd SimpleApp && react-native run-ios
```

NOTE: Make sure having latest Xcode or ADK
- https://facebook.github.io/react-native/docs/troubleshooting.html
- https://github.com/facebook/react-native/issues/7308

---

# Better start

```bash
$ npm install -g create-react-native-app

$ create-react-native-app my-app
$ cd my-app/
$ npm start
```

- ES 6+ (Babel)
- Dev Tasks (fly)
- Expo

---
layout: false
# How to Debug

- https://facebook.github.io/react-native/docs/debugging.html
- https://github.com/jhen0409/react-native-debugger

---

# Best Practices

- Views
- Image
- Navigator
- Custom native component
- Custom native module

---
layout: true
# Views
---

## View vs ScrollView vs ListView

---
layout: true
## View vs ScrollView vs ListView
---

### View
- Fundamental Component like DIV
- flexbox, style, event

```js
class ViewColoredBoxesWithText extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', height: 100, padding: 20}}>
        <View style={{backgroundColor: 'blue', flex: 0.3}} />
        <View style={{backgroundColor: 'red', flex: 0.5}} />
        <Text>Hello World!</Text>
      </View>
    );
  }
}
```
---

### ScrollView
- Basic scrolling container for list items
- Multiple components and views
- Scroll both vertically and horizontally

```js
import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text } from 'react-native'

class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
  render() {
      return (
        <ScrollView>
          <Text style={{fontSize:96}}>Scroll me plz</Text>
          <Image source={require('./img/favicon.png')} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
    );
  }
}

AppRegistry.registerComponent(
  'IScrolledDownAndWhatHappenedNextShockedMe',
  () => IScrolledDownAndWhatHappenedNextShockedMe);
```
---

### ListView
- Enhanced container for big list
- Changing but similar structure
- Only renders elements that are currently showing on the screen

```js
class ListViewBasics extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView dataSource={this.state.dataSource} renderRow={(rowData) =>(
            <Text>{rowData}</Text>
          )}
        />
      </View>
    );
  }
}
```

---

## Practice
1. Start with create-react-native-app
2. Show a ScrollView with 200 items, number 1 - 200
3. Show a ScrollView with 10000 items
4. Show a ListView with 10000 items

---
layout: true
# Image
---

## Image vs Background Image or IMG tag

```js
// Web
const img = <img src="pic.jpg" alt=""/>
const container = <div style={background: url('bg.jpg')}>Inside Text</div>
```

```js
// React Native
const image = <Image source={require('./img/check.png')} />
const containerWithImage = (
  <Image source={require('./bg.png')}>
    <Text>Inside Text</Text>
  </Image>
)
```

---
layout: false
# Text Input

```js
const view = (
<View style={{padding: 10}}>
  <TextInput
    style={{height: 40}}
    placeholder="Type here to translate!"
    onChangeText={(text) => this.setState({text})}
  />
</View>
)
```

---
layout: true
# Navigation
---

```js
// Web
window.location.replace('/xx')
```

```js
// React
import { Router } from 'react-router'
import HomePage from './Home'
const router = (
  <Router path="/">
    <Router path="home" component={HomePage}/>
  </Router>
)
```
---
## Single Screen App

```js
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Main: {screen: MainScreen},
  Profile: {screen: ProfileScreen},
});
```
```js
class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Profile', { name: 'Jane' });
        }
      />
    );
  }
}
```

---

## Tab based app
```js
import {Navigation} from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
}
```
```js
import {registerScreens} from './screens';
registerScreens();

const SHOW_SHARED_ELEMENT_SCREENS = false;
const createTabs = () => ([
  { label: 'One', screen: 'example.FirstTabScreen', },
  { label: 'Two', screen: 'example.SecondTabScreen', }
]);
// this will start our app
Navigation.startTabBasedApp({
  tabs: createTabs()
});
```

---

## Practice
1. Create a Single Screen App
---
class: middle center
# Thanks
