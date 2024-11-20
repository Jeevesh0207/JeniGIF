import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const GifCard = React.memo(({gif, setIsModalOpen, setOneCardData}) => {
  const gifUrl = gif?.images?.fixed_width?.url;
  const staticUrl = gif?.images?.fixed_width_still?.url; // Static frame for pausing
  const [isPlaying, setIsPlaying] = useState(false);
  const {isDark,colors} = useTheme()

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        setIsPlaying(!isPlaying)
      }}
      onLongPress={() => {
        setOneCardData(gif);
        setIsModalOpen(true);
      }} 
    >
      <FastImage
        style={[styles.gif,{opacity:isDark ?0.9 :1}]}
        source={{
          uri: isPlaying ? gifUrl : staticUrl, 
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </TouchableOpacity>
  );
});

export default GifCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    aspectRatio: 1,
  },
  gif: {
    flex: 1,
  },
});
