import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';


const states_list = [];

fetch('http://localhost:3000/states')
.then((res) => {
  return res.json();
})
.then((data) => {
  console.log(data.length)
  for (let i = 0; i < data.length; i++) {
    states_list.push(data[i]);
  }
});


const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title]}>{item}</Text>
  </TouchableOpacity>
);


export default function App() {

  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item === selectedId ? '#ffffff' : 'bbbbbb';
    const color = item === selectedId ? 'black' : 'white';

  return (
    <Item
    item={item}
    onPress={() => setSelectedId(item)}
    backgroundColor={backgroundColor}
    />
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}> Savings Carousel Test</Text>
      <FlatList style={styles.flatlist}
        horizontal
        data={states_list}
        renderItem={renderItem}
        //extraData={selectedId}
        //renderItem={({item}) => <Item title={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eeeeee',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    height: 80,
    marginVertical: 16,
    marginHorizontal: 16,
    width: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#bebebe',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Arial',
  },
  header: {
    paddingTop: 40,
    paddingLeft: 10,
    fontSize: 25,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  flatlist: {
    height: 150,
  }
});
