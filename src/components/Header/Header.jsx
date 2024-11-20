import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fonts} from '../../../constants';
import {LightSvg, DarkSvg} from '../../svg';
import {useTheme} from '@react-navigation/native';
const Header = ({isDark, setIsDark}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.vetical_center, styles.logo_container]}>
        <Image source={require('../../img/logo1.png')} style={styles.logo} />
        <Text style={[styles.logo_text, {color: colors.text}]}>JeniGIF</Text>
      </View>
      <TouchableOpacity
        style={[styles.make_center, styles.mode_container]}
        onPress={() => setIsDark(!isDark)}>
        {isDark ? (
          <LightSvg fill={'yellow'} width={26} height={26} />
        ) : (
          <DarkSvg width={26} height={26} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  make_center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vetical_center: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo_container: {
    width: 150,
    height: '100%',
  },
  logo: {
    width: 40,
    height: 40,
  },
  logo_text: {
    fontSize: 20,
    marginLeft: 8,
    fontFamily: fonts.bold,
  },
  mode_container: {
    width: 50,
    height: '100%',
  },
});
