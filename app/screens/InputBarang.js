import React, {useState} from 'react';
import {Alert, Modal, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
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
        <Text>Aqua Galon</Text>
        <Text style={{color: '#6EDB5A'}}>{'\u2B24'} Grosir</Text>
      </View>
      <Text style={{fontWeight: 'bold'}}>Rp. 25.000</Text>
      <View style={{flexDirection: 'row'}}>
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
        <Feather
          name="trash"
          size={20}
          color="black"
          style={{backgroundColor: '#f99', borderRadius: 5, padding: 3}}
        />
      </View>
    </View>
  );
};

const InputBarang = ({navigation}) => {
  const [modalToggle, setModalToggle] = useState(false);
  return (
    <View style={{flex: 1, padding: 20, backgroundColor: '#fff'}}>
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
            <View style={{paddingVertical: 10}}>
              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Nama Barang :</Text>
                <TextInput style={{borderBottomWidth: 1, paddingVertical: 2}} />
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Harga :</Text>
                <TextInput style={{borderBottomWidth: 1, padding: 5}} />
              </View>

              <Text style={{fontWeight: 'bold'}}>Tipe :</Text>
              <Picker>
                <Picker.Item label="Grosir" value="Grosir" />
                <Picker.Item label="Ecerean" value="Eceran" />
              </Picker>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                  setModalToggle(false);
                  navigation.navigate('SucceesScreen', {
                    kembali: () => {
                      navigation.navigate('InputBarang');
                    },
                  });
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
          <Feather name="search" size={20} style={{paddingHorizontal: 15}} />

          <TextInput style={{flex: 1, paddingRight: 15}} />
        </View>
      </View>

      <ScrollView>
        <Item />
        <Item />
      </ScrollView>
    </View>
  );
};

export default InputBarang;
