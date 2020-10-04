import React, {useState, Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
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
        <Text style={{fontSize: 18, paddingBottom: 10}}>{props.nama}</Text>
        <Text style={{fontSize: 16, paddingBottom: 3}}>{props.alamat}</Text>
        <Text style={{fontSize: 16}}>{props.telp}</Text>
      </View>

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

const InputPelanggan = ({navigation}) => {
  const [modalToggle, setModalToggle] = useState(false);
  const [inputNama, setInputNama] = useState('nama');
  const [inputAlamat, setInputAlamat] = useState('Alamat');
  const [inputTelp, setInputTelp] = useState('Telp');

  const [pelanggan, setPelanggan] = useState([
    {
      key: '1',
      nama: 'Rifqi Radifan',
      alamat: 'Jl. Ikan Piranha Atas',
      telp: '081334177037',
    },
    {
      key: '2',
      nama: 'Putri Harviana',
      alamat: 'Jl. Akik Tlogomas Malang',
      telp: '082234168153',
    },
  ]);

  const [tempData, setTempData] = useState(pelanggan);

  const [value, onChangeText] = React.useState('Useless Placeholder');

  const searchHandler = (val) => {
    setTempData(
      pelanggan.filter((item) => {
        return item.nama.toLowerCase().includes(val.toLowerCase());
      }),
    );
  };

  const inputHandler = () => {
    setTempData((prevPelanggan) => {
      return [
        {
          nama: inputNama,
          alamat: inputAlamat,
          telp: inputTelp,
          key: Math.random().toString(),
        },
        ...prevPelanggan,
      ];
    });
    setInputNama('');
    setInputAlamat('');
    setInputTelp('');
    setModalToggle(false);
    navigation.navigate('SucceesScreen', {
      kembali: () => {
        navigation.navigate('InputPelanggan');
      },
    });
  };

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
              Input Data Pelanggan
            </Text>
            <View style={{paddingVertical: 10}}>
              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Nama Pelanggan :</Text>
                <TextInput
                  style={{borderBottomWidth: 1, paddingVertical: 2}}
                  onChangeText={(val) => {
                    setInputNama(val);
                  }}
                />
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Alamat :</Text>
                <TextInput
                  style={{borderBottomWidth: 1, padding: 5}}
                  onChangeText={(val) => {
                    setInputAlamat(val);
                  }}
                />
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Keterangan :</Text>
                <TextInput style={{borderBottomWidth: 1, padding: 5}} />
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>No. Telpon :</Text>
                <TextInput
                  style={{borderBottomWidth: 1, padding: 5}}
                  onChangeText={(val) => {
                    setInputTelp(val);
                  }}
                />
              </View>
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
            <Feather name="plus" size={20} /> Tambah Data Pelanggan
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

          <TextInput
            style={{flex: 1, paddingRight: 15}}
            placeholder="Cari pelanggan"
            onChangeText={searchHandler}
          />
        </View>
      </View>
      <FlatList
        data={tempData}
        renderItem={({item}) => (
          <Item nama={item.nama} alamat={item.alamat} telp={item.telp} />
        )}
      />
    </View>
  );
};

export default InputPelanggan;
