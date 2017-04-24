import React from 'react';
import { StyleSheet, Text, View, ScrollView, ListView } from 'react-native';

export default class App extends React.Component {
  getView() {
    return <View><Text>Hello World</Text></View>
  }
  getScrollView() {
    const array = []
    for (var i = 0; i < 10000; i++) {
      array.push(i)
    }
    return (
      <ScrollView>
        {
          array.map(index => (
            <Text key={index}>{index}----------------------</Text>
          ))
        }
      </ScrollView>
    )
  }
  getListView() {
    const array = []
    for (var i = 0; i < 100000; i++) {
      array.push(i)
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return (
      <ListView
        dataSource={ds.cloneWithRows(array)}
        renderRow={(rowData) => <Text style={styles.text}>{rowData}------</Text>}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.getListView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
  }
});
