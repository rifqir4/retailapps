import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import HomeMenu from '../components/HomeMenu';
import Feather from 'react-native-vector-icons/Feather';

export default function Home({navigation}) {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.info}>
        <Image source={require('../../assets/images/welcome.png')} />
        <Text
          style={{fontSize: 28, padding: 5, fontFamily: 'opensans-regular'}}>
          Toko Ada Serbagunaas
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Feather name="map-pin" size={20} color="black" />

            <Text
              style={{
                paddingLeft: 5,
                fontFamily: 'opensans-regular',
                fontSize: 16,
              }}>
              Jalan Akik 10 Tlogomas
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2,
            }}>
            <Feather name="phone" size={20} color="black" />

            <Text
              style={{
                paddingLeft: 5,
                fontFamily: 'opensans-regular',
                fontSize: 16,
              }}>
              081334177037
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.menus}>
        <HomeMenu
          title="Kasir"
          subtitle="Transaksi berhasil dan print struk pembayaran"
          img={require('../../assets/images/giveaway.png')}
          screen={() => navigation.navigate('Kasir')}
        />
        <HomeMenu
          title="Input Barang"
          subtitle="Input barang dengan memilih dua tipe yaitu grosir dan eceran"
          img={require('../../assets/images/newsletter.png')}
          screen={() => navigation.navigate('InputBarang')}
        />
        <HomeMenu
          title="Input Data Pelanggan"
          subtitle="Memasukkan data penjual seperti nama, alamat, dan nomer
          telephone"
          img={require('../../assets/images/data.png')}
          screen={() => navigation.navigate('InputPelanggan')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menus: {
    width: '100%',
    padding: 20,
  },
});
