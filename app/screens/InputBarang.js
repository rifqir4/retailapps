import React, { useState } from 'react';
import {
  Alert, Modal, Text, TouchableOpacity, View, StyleSheet,
  Platform, Image, SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Firebase from '../components/Firebase';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

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
        <Text style={{ fontSize: 18, paddingBottom: 10 }}>
          {props.namaBarang}
        </Text>
        <Text style={{ fontSize: 16, color: '#6EDB5A', paddingBottom: 3 }}>
          {'\u2B24'} {props.tipe}
        </Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Rp. {props.harga}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
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
            style={{
              backgroundColor: '#f99',
              borderRadius: 5,
              padding: 3,
            }}
            onPress={props.delete}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InputBarang = ({ navigation }) => {
  const [loadStatus, setLoadStatus] = useState(false);

  const GetBarang = () => {
    let d = [];
    Firebase.database()
      .ref('barang')
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
  const [inputBarang, setNamaBarang] = useState('namaBarang');
  const [inputTipe, setInputTipe] = useState('tipe');
  const [inputHarga, setInputHarga] = useState('harga');
  const [tempData, setTempData] = useState(GetBarang());

  const [dataBarang, setDataBarang] = useState(GetBarang());

  const [value, onChangeText] = React.useState('Useless Placeholder');

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const searchHandler = (val) => {
    setTempData(
      dataBarang.filter((item) => {
        return item.namaBarang.toLowerCase().includes(val.toLowerCase());
      }),
    );
  };

  const inputHandler = () => {
    const currentKey = String(GenerateKey());
    const inputData = {
      key: String(currentKey),
      namaBarang: inputBarang,
      tipe: inputTipe,
      harga: inputHarga,
    };

    Firebase.database()
      .ref('barang/' + currentKey)
      .set(inputData)
      .then(() => {
        setLoadStatus(false);
        setTempData(GetBarang());
        setNamaBarang('');
        setInputHarga('');
        setInputTipe('');
        setModalToggle(false);
        navigation.navigate('SucceesScreen', {
          kembali: () => {
            navigation.navigate('InputBarang');
          },
        });
      });
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
              .ref('barang/' + key)
              .remove();
          },
        },
      ],
    );
  };

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);

    // const storage = Firebase.storage();
    Firebase.storage()
      .ref(filename)
      .putFile(uploadUri)
      // set progress state
      .then((snapshot) => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage(null);
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
              <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
                  <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                  {image !== null ? (
                    <Image source={{ uri: image.uri }} style={styles.imageBox} />
                  ) : null}
                  {uploading ? (
                    <View style={styles.progressBarContainer}>
                      <Progress.Bar progress={transferred} width={300} />
                    </View>
                  ) : (
                      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                        <Text style={styles.buttonText}>Upload image</Text>
                      </TouchableOpacity>
                    )}
                </View>
              </SafeAreaView>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Nama Barang :</Text>
                <TextInput
                  style={{ borderBottomWidth: 1, paddingVertical: 2 }}
                  onChangeText={(val) => {
                    setNamaBarang(val);
                  }}
                />
              </View>

              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Harga :</Text>
                <TextInput
                  style={{ borderBottomWidth: 1, padding: 5 }}
                  onChangeText={(val) => {
                    setInputHarga(val);
                  }}
                />
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

          <TextInput
            style={{ flex: 1, paddingRight: 15 }}
            placeholder="Cari data barang"
            onChangeText={searchHandler}
          />
        </View>
      </View>

      {loadStatus ? (
        <FlatList
          data={tempData.sort((a, b) => {
            return b.namaBarang < a.namaBarang;
          })}
          renderItem={({ item }) => (
            <Item
              namaBarang={item.namaBarang}
              tipe={item.tipe}
              harga={item.harga}
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

export default InputBarang;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#bbded6'
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  }
});