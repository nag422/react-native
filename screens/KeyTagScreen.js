import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      URL:'',
      title: 'business.twitter.com',
      image:'',
      keytags:[{'value':'digital'},{'value':'Marketing'}],
      time_elapsed:new Date()
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      URL:'',
      title: 'business.twitter.com',
      image:'',
      keytags:[{'value':'digital'},{'value':'Marketing'}],
      time_elapsed:new Date()
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      URL:'',
      title: 'business.twitter.com',
      image:'',
      keytags:[{'value':'digital'},{'value':'Marketing'}],
      time_elapsed:new Date()
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      URL:'',
      title: 'business.twitter.com',
      image:'',
      keytags:[{'value':'digital'},{'value':'Marketing'}],
      time_elapsed:new Date()
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      URL:'https://picsum.photos/300',
      title: 'business.twitter.com',
      image:'https://picsum.photos/300',
      keytags:[{'value':'digital'},{'value':'Marketing'}],
      time_elapsed:new Date()
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      URL:'https://picsum.photos/300',
      title: 'business.twitter.com',
      image:'https://picsum.photos/300',
      keytags:[{'value':'digital'},{'value':'Marketing'}],
      time_elapsed:new Date()
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      URL:'https://picsum.photos/300',
      title: 'business.twitter.com',
      image:'https://picsum.photos/300',
      keytags:[{'value':'digital'},{'value':'Marketing'}],
      time_elapsed:new Date()
    }
    
  ];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const KeyTagScreen = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    // <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default KeyTagScreen;