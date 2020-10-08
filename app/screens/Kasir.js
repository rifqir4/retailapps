import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
const Kasir = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const onPressPlus = () => setCount(prevCount => prevCount + 1);
  const onPressMinus = () => setCount(prevCount => prevCount - 1);
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          backgroundColor: '#2A6FA1',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#77ACD1',
                borderRadius: 10,
                marginRight: 20,
              }}>
              <Feather name="map-pin" size={20} color="white" />
            </View>
            <View style={{ justifyContent: 'center', paddingRight: 20 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Alamat</Text>
              <Text style={{ color: '#fff' }}>Jalan Jalan No 8</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#77ACD1',
                borderRadius: 10,
                marginRight: 20,
              }}>
              <Feather name="info" size={20} color="white" />
            </View>
            <View style={{ justifyContent: 'center', paddingRight: 20 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Keterangan
              </Text>
              <Text style={{ color: '#fff' }}>Pagar Hitam</Text>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E3E1E1',
              borderRadius: 10,
            }}>
            <Feather name="edit" size={20} color="black" />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Kategori');
        }}>
        <View
          style={{ width: '100%', alignItems: 'flex-end', marginVertical: 10 }}>
          <View
            style={{
              padding: 10,
              backgroundColor: '#6EEB5A',
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ paddingRight: 5 }}>Tambah Barang Baru</Text>
            <Feather name="plus" size={20} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <View>
            <Text>Aqua Galon</Text>
            <Text style={{ color: '#6EDB5A' }}>{'\u2B24'} Grosir</Text>
          </View>
          <Text style={{ fontWeight: 'bold' }}>Rp. 25.000</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={onPressPlus}
            >
              <Feather
                name="plus"
                size={20}
                color="black"
                style={{ backgroundColor: '#fdd', borderRadius: 5, padding: 3 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                backgroundColor: '#ddd',
                padding: 5,
                marginHorizontal: 5,
              }}>
              {count}
            </Text>
            <TouchableOpacity onPress={onPressMinus}
            >
              <Feather
                name="minus"
                size={20}
                color="black"
                style={{ backgroundColor: '#dfd', borderRadius: 5, padding: 3 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>Total: </Text>
          <Text style={{ fontWeight: 'bold' }}>Rp. 50.000</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Checkout');
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Text
              style={{
                backgroundColor: '#6EEB5A',
                padding: 10,
                borderRadius: 10,
              }}>
              <Feather name="shopping-cart" size={20} color="black" /> {'  '}
              Selesaikan Pembelanjaan
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Kasir;
