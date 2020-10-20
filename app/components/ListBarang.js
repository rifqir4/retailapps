import {useTheme} from '@react-navigation/native';
import React, {useState, usestate} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Firebase from './Firebase';

const Item = (props) => {
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
          <Text style={{color: '#fff', marginBottom: 10}}>
            {props.barang.namaBarang}
          </Text>
          <Text style={{color: '#fff'}}>{props.barang.tipe}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ListBarang = (props) => {
  const [loadData, setLoadData] = useState(false);

  const GetData = () => {
    let d = [];
    Firebase.database()
      .ref('barang')
      .orderByKey()
      .once('value', (data) => {
        Object.keys(data.toJSON()).forEach((key) => {
          d.push(data.toJSON()[key]);
        });
      })
      .then(() => {
        setLoadData(true);
      });
    return d;
  };

  const [tempData, setTempData] = useState([
    {
      key: '1',
      nama: 'Aqua Galon',
    },
    {
      key: '2',
      nama: 'Pulpy',
    },
  ]);
  const [dataBarang, setDataBarang] = useState(GetData());

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        backgroundColor: '#fff',
      }}>
      {loadData ? (
        <FlatList
          style={{width: '100%', height: '100%'}}
          data={dataBarang}
          numColumns={props.numColumn}
          renderItem={({item}) => <Item barang={item} />}
        />
      ) : (
        <Text>Loading Data!!!</Text>
      )}
    </View>
  );
};

export default ListBarang;
