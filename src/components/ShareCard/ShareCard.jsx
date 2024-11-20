import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {fonts} from '../../../constants';
import {useTheme} from '@react-navigation/native';

import {ShareSvg, DownloadSvg} from '../../svg';

const ShareCard = ({oneCardData, setIsModalOpen}) => {
  const gifUrl = oneCardData?.images?.fixed_width?.url;
  const {colors} = useTheme();

  const handleDownload = async () => {
    try {
      const fileName = gifUrl.split('/').pop().split('?')[0]; // Remove query parameters
      const localPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const download = await RNFS.downloadFile({
        fromUrl: gifUrl,
        toFile: localPath,
      }).promise;

      if (download.statusCode === 200) {
        Alert.alert('Success', 'GIF downloaded to your downloads folder!');
      } else {
        Alert.alert('Error', 'Failed to download GIF.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while downloading the GIF.');
    }
  };

  const handleShare = async () => {
    try {
      const fileName = gifUrl.split('/').pop().split('?')[0]; // Remove query parameters
      const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // Download file to a temporary location for sharing
      await RNFS.downloadFile({
        fromUrl: gifUrl,
        toFile: localPath,
      }).promise;

      await Share.open({
        url: `file://${localPath}`,
        type: 'image/gif',
      });
    } catch (error) {
      console.error(error);
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'An error occurred while sharing the GIF.');
      }
    }
  };

  const handleOutsideClick = () => {
    setIsModalOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.mini_container,
                {backgroundColor: colors.background,shadowColor:colors.text},
              ]}>
              <View style={[styles.gif_container]}>
                <FastImage
                  style={styles.gif}
                  source={{
                    uri: gifUrl,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>
              <Text style={[styles.text, {color: colors.text}]}>
                {oneCardData?.title}
              </Text>
              <TouchableOpacity
                style={[
                  styles.make_center,
                  styles.button,
                  {backgroundColor: colors.solidcolor},
                ]}
                onPress={handleShare}>
                <Text style={styles.button_text}>Share</Text>
                <ShareSvg fill="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.make_center,
                  styles.button,
                  {backgroundColor: colors.solidcolor},
                ]}
                onPress={handleDownload}>
                <Text style={styles.button_text}>Download</Text>
                <DownloadSvg fill="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.make_center,
                  styles.button,
                  {backgroundColor: colors.solidcolor},
                ]}
                onPress={() => setIsModalOpen(false)}>
                <Text style={styles.button_text}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ShareCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  make_center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mini_container: {
    height: 580,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
    elevation:100
  },
  gif_container: {
    width: 300,
    height: 300,
    overflow: 'hidden',
    borderRadius: 10,
  },
  button: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    flexDirection: 'row',
  },
  gif: {
    flex: 1,
  },
  button_text: {
    fontSize: 14,
    fontFamily: fonts.book,
    marginRight: 10,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.book,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});
