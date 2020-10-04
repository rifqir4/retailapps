import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
const Success = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={props.img} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20,
        }}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#323232',
    fontSize: 26,
    fontFamily: 'opensans-bold',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
});
