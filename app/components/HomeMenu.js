import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
const HomeMenu = (props) => {
  return (
    <TouchableOpacity onPress={props.screen}>
      <View style={styles.menu}>
        <View style={styles.logo}>
          <Image
            source={props.img}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={{paddingLeft: 25, flex: 1, justifyContent: 'center'}}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeMenu;

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D0CFCF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  logo: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6ba0c7',
    borderRadius: 5,
  },
  title: {
    margin: 0,
    fontSize: 20,
    color: '#323232',
    fontFamily: 'opensans-regular',
  },
  subtitle: {
    color: '#323232',
    fontSize: 11,
    fontFamily: 'opensans-regular',
  },
});
