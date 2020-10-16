import React, {useState, Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Firebase from '../components/Firebase';

const GenerateKey = () => {
  var JakartaTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
  });
  var Today = new Date(JakartaTime);
  return Today.getTime();
};

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
        <TouchableOpacity onPress={props.edit}>
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
        <TouchableOpacity onPress={props.delete}>
          <Feather
            name="trash"
            size={20}
            color="black"
            style={{backgroundColor: '#f99', borderRadius: 5, padding: 3}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InputPelanggan = ({navigation}) => {
  const [loadStatus, setLoadStatus] = useState(false);

  const GetPelanggan = () => {
    let d = [];
    Firebase.database()
      .ref('pelanggan')
      .orderByKey()
      .once('value', (data) => {
        Object.keys(data.toJSON()).forEach(function (key) {
          d.push(data.toJSON()[key]);
        });
      })
      .then(() => {
        setLoadStatus(true);
      });
    return d;
  };

  const [modalToggle, setModalToggle] = useState(false);
  const [inputNama, setInputNama] = useState(' ');
  const [inputAlamat, setInputAlamat] = useState(' ');
  const [inputTelp, setInputTelp] = useState(' ');
  const [inputKet, setInputKet] = useState(' ');

  const [pelanggan, setPelanggan] = useState(GetPelanggan());

  const [tempData, setTempData] = useState(pelanggan);

  const [editData, setEditData] = useState();
  const [value, onChangeText] = React.useState('Useless Placeholder');

  const searchHandler = (val) => {
    setTempData(
      pelanggan.filter((item) => {
        return item.nama.toLowerCase().includes(val.toLowerCase());
      }),
    );
  };

  const inputHandler = () => {
    const currentKey = GenerateKey();
    const inputData = {
      nama: inputNama,
      alamat: inputAlamat,
      telp: inputTelp,
      ket: inputKet,
      key: String(currentKey),
    };

    Firebase.database()
      .ref('pelanggan/' + currentKey)
      .set(inputData)
      .then(() => {
        setLoadStatus(false);
        setTempData(GetPelanggan());
        setInputNama('');
        setInputAlamat('');
        setInputTelp('');
        setInputKet('');
        setModalToggle(false);
        navigation.navigate('SucceesScreen', {
          kembali: () => {
            navigation.navigate('InputPelanggan');
          },
        });
      });
  };

  const editHandler = (data) => {
    setInputNama(data.nama);
    setInputAlamat(data.alamat);
    setInputTelp(data.telp);

    setModalToggle(true);
  };

  const deleteHandler = (key) => {
    Alert.alert(
      'Anda Yakin Menghapus Item?',
      'Item yang sudah dihapus tidak dapat dikemballikan lagi!!',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Yakin',
          style: 'default',
          onPress: () => {
            setTempData((prevData) => {
              return prevData.filter((item) => item.key != key);
            });
            Firebase.database()
              .ref('pelanggan/' + key)
              .remove();
          },
        },
      ],
    );
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
                  value={inputNama}
                />
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Alamat :</Text>
                <TextInput
                  style={{borderBottomWidth: 1, padding: 5}}
                  onChangeText={(val) => {
                    setInputAlamat(val);
                  }}
                  value={inputAlamat}
                />
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Keterangan :</Text>
                <TextInput
                  style={{borderBottomWidth: 1, padding: 5}}
                  onChangeText={(val) => {
                    setInputKet(val);
                  }}
                />
              </View>

              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>No. Telpon :</Text>
                <TextInput
                  style={{borderBottomWidth: 1, padding: 5}}
                  onChangeText={(val) => {
                    setInputTelp(val);
                  }}
                  value={inputTelp}
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
            setInputNama('');
            setInputAlamat('');
            setInputTelp('');
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
      {loadStatus ? (
        <FlatList
          data={tempData}
          renderItem={({item}) => (
            <Item
              nama={item.nama}
              alamat={item.alamat}
              telp={item.telp}
              edit={() => {
                editHandler(item);
              }}
              delete={() => {
                deleteHandler(item.key);
              }}
            />
          )}
        />
      ) : (
        <Text>Loading!!!</Text>
      )}
    </View>
  );
};

export default InputPelanggan;
