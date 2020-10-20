import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import ListBarang from '../components/ListBarang';

const Kategori = () => {
  const [tempData, setTempData] = useState([
    {
      key: '1',
      nama: 'Aqua Galon',
    },
    {
      key: '2',
      nama: 'Pulpy',
    },
  ]);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ListBarang numColumn={2} />
    </View>
  );
};

export default Kategori;
