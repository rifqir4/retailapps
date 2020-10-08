import React, { useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const Item = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E8F5FF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}>
      <View>
        <Text style={{ fontSize: 18, paddingBottom: 10 }}>{props.namaBarang}</Text>
        <Text style={{ fontSize: 16, color: '#6EDB5A', paddingBottom: 3 }}>{'\u2B24'} {props.tipe}</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.harga}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity >
          <Feather
            name="edit"
            size={20}
            color="black"
            style={{
              backgroundColor: '#9f9',
              borderRadius: 5,
              padding: 3,
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="trash"
            size={20}
            color="black"
            style={{ backgroundColor: '#f99', borderRadius: 5, padding: 3 }}
          ></Feather>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InputBarang = ({ navigation }) => {
  const [modalToggle, setModalToggle] = useState(false);
  const [inputBarang, setNamaBarang] = useState('namaBarang');
  const [inputTipe, setInputTipe] = useState('tipe');
  const [inputHarga, setInputHarga] = useState('harga');

  const [dataBarang, setDataBarang] = useState([
    {
      key: '1',
      namaBarang: 'Aqua Galon',
      tipe: 'Grosir',
      harga: '25.000',
    },
    {
      key: '2',
      namaBarang: 'Aqua Gelas',
      tipe: 'Eceran',
      harga: '35.000',
    }
  ]);

  const [tempData, setTempData] = useState(dataBarang);

  const [value, onChangeText] = React.useState('Useless Placeholder');

  const searchHandler = (val) => {
    setTempData(
      dataBarang.filter((item) => {
        return item.namaBarang.toLowerCase().includes(val.toLowerCase());
      }),
    );
  };

  const inputHandler = () => {
    setTempData((prevBarang) => {
      return [
        {
          namaBarang: inputBarang,
          tipe: inputTipe,
          harga: inputHarga,
          key: Math.random().toString(),
        },
        ...prevBarang,
      ];
    });
    setNamaBarang('');
    setInputHarga('');
    setInputTipe('');
    setModalToggle(false);
    navigation.navigate('SucceesScreen', {
      kembali: () => {
        navigation.navigate('InputBarang');
      },
    });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Modal visible={modalToggle} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            flexDirection: 'column-reverse',
          }}>
          <View
            style={{
              padding: 10,
              backgroundColor: '#fff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                paddingVertical: 10,
                fontSize: 20,
                borderBottomWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
              }}>
              Input Barang
            </Text>
            <View style={{ paddingVertical: 10 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Nama Barang :</Text>
                <TextInput style={{ borderBottomWidth: 1, paddingVertical: 2 }}
                  onChangeText={(val) => {
                    setNamaBarang(val);
                  }} />
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Harga :</Text>
                <TextInput style={{ borderBottomWidth: 1, padding: 5 }} onChangeText={(val) => {
                  setInputHarga(val);
                }} />
              </View>

              <Text style={{ fontWeight: 'bold' }}>Tipe :</Text>
              <Picker
                selectedValue={inputTipe}
                onValueChange={(itemValue, itemIndex) => {
                  setInputTipe(itemValue);
                }}>
                <Picker.Item label="Grosir" value="Grosir" />
                <Picker.Item label="Eceran" value="Eceran" />
              </Picker>
              {/*Text to show selected picker value*/}
              <Text>Selected Value: {inputTipe}</Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => {
                  setModalToggle(false);
                }}>
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: '#faa',
                    borderRadius: 10,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  inputHandler();
                }}>
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: '#afa',
                    borderRadius: 10,
                  }}>
                  Tambah
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalToggle(true);
          }}>
          <Text
            style={{
              padding: 10,
              backgroundColor: '#9f9',
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <Feather name="plus" size={18} /> Tambah Barang
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
          }}>
          <Feather name="search" size={20} style={{ paddingHorizontal: 15 }} />

          <TextInput style={{ flex: 1, paddingRight: 15 }}
            placeholder="Cari data barang"
            onChangeText={searchHandler} />
        </View>
      </View>

      <FlatList
        data={tempData} renderItem={({ item }) => (
          <Item namaBarang={item.namaBarang} tipe={item.inputTipe} harga={item.harga} />
        )}
      />
    </View >
  );
};

export default InputBarang;
