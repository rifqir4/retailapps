import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const Table = (props) => {
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headcell, {flex: 2}]}>Item</Text>
          <Text style={[styles.headcell, {flex: 2}]}>Harga</Text>
          <Text style={[styles.headcell, {flex: 1.5}]}>Jumlah</Text>
          <Text style={[styles.headcell, {flex: 2.5}]}>Total</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.cell, {flex: 2}]}>Aqua Galon</Text>
          <Text style={[styles.cell, {flex: 2}]}>Rp. 25.000,-</Text>
          <Text style={[styles.cell, {flex: 1.5}]}>13</Text>
          <Text style={[styles.cell, {flex: 2.5}]}>Rp. 500.000</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.cell, {flex: 2}]}>Aqua Galon</Text>
          <Text style={[styles.cell, {flex: 2}]}>Rp. 25.000,-</Text>
          <Text style={[styles.cell, {flex: 1.5}]}>13</Text>
          <Text style={[styles.cell, {flex: 2.5}]}>Rp. 500.000</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.cell, {flex: 2}]}>Aqua Galon</Text>
          <Text style={[styles.cell, {flex: 2}]}>Rp. 25.000,-</Text>
          <Text style={[styles.cell, {flex: 1.5}]}>13</Text>
          <Text style={[styles.cell, {flex: 2.5}]}>Rp. 500.000</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const Checkout = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
      }}>
      <Table />

      <View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            marginBottom: 10,
          }}>
          <Text>Alamat</Text>
          <Text style={{marginBottom: 10}}>Jl. Akik No. 10 Tlogomas</Text>
          <Text>Keterangan</Text>
          <Text style={{marginBottom: 10}}>Pagar Hitam</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold'}}>Total: </Text>
          <Text style={{fontWeight: 'bold'}}>Rp. 50.000</Text>
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
              <Feather name="printer" size={20} color="black" /> {'  '}
              Cetak Struk
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  headcell: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
