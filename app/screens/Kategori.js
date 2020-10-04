import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const Item = () => {
  return (
    <View
      style={{
        width: '50%',
        height: 150,
        padding: 10,
      }}>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#ddd',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#2A6FA1',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff'}}>Rumah Tangga</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Kategori = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        backgroundColor: '#fff',
      }}>
      <Item />
      <Item />
      <Item />
    </View>
  );
};

export default Kategori;
