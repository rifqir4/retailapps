import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import ListBarang from '../components/ListBarang';

const Item = (props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => props.hapus(props.barang.key)}>
        <View>
          <Text>{props.barang.nama}</Text>
          <Text style={{color: '#6EDB5A'}}>
            {'\u2B24'} {props.barang.tipe}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>Rp. {props.barang.harga}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Feather
              name="plus"
              size={20}
              color="black"
              style={{backgroundColor: '#fdd', borderRadius: 5, padding: 3}}
            />
          </TouchableOpacity>
          <Text
            style={{
              backgroundColor: '#ddd',
              padding: 5,
              marginHorizontal: 5,
            }}>
            {props.barang.jumlah}
          </Text>
          <TouchableOpacity>
            <Feather
              name="minus"
              size={20}
              color="black"
              style={{backgroundColor: '#dfd', borderRadius: 5, padding: 3}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.hapus;
        }}>
        <Text>hapus</Text>
      </TouchableOpacity>
    </View>
  );
};

const Kasir = ({navigation}) => {
  const [count, setCount] = useState(0);

  const [keranjang, setKeranjang] = useState([
    {
      key: '1',
      nama: 'Aqua Galon',
      tipe: 'Eceran',
      harga: 25000,
      jumlah: 0,
    },
  ]);

  const tambahKeranjang = () => {};

  const hapusKeranjang = () => {
    // setKeranjang((prev) => {
    //   return prev.filter((item) => item.key != key);
    // });
    setKeranjang('kuda');
    Alert.alert('tes');
  };
  const [modalToggle, setModalToggle] = useState(false);
  return (
    <View style={{flex: 1, padding: 20, backgroundColor: '#fff'}}>
      <Modal visible={modalToggle} animationType="fade" transparent={true}>
        <ListBarang numColumn={2} />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setModalToggle(false);
            }}>
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#f55',
                borderRadius: 10,
                fontSize: 20,
                color: '#fff',
              }}>
              Batal
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
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
            <View style={{justifyContent: 'center', paddingRight: 20}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Alamat</Text>
              <Text style={{color: '#fff'}}>Jalan Jalan No 8</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 10}}>
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
            <View style={{justifyContent: 'center', paddingRight: 20}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Keterangan
              </Text>
              <Text style={{color: '#fff'}}>Pagar Hitam</Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
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
          setModalToggle(true);
          //navigation.navigate('Kategori');
        }}>
        <View
          style={{width: '100%', alignItems: 'flex-end', marginVertical: 10}}>
          <View
            style={{
              padding: 10,
              backgroundColor: '#6EEB5A',
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{paddingRight: 5}}>Tambah Barang Baru</Text>
            <Feather name="plus" size={20} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      <ScrollView>
        {keranjang.map((item) => {
          return (
            <Item
              key={item.key}
              barang={item}
              hapus={() => {
                hapusKeranjang();
              }}
            />
          );
        })}
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
