import React, {useMemo, useCallback} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {SearchSvg} from '../../svg';
import {useTheme} from '@react-navigation/native';

const Search = React.memo(({query, setQuery}) => {
  const {colors} = useTheme();


  const themedStyles = useMemo(
    () => ({
      input: {
        borderColor: colors.solidcolor,
        backgroundColor: colors.inputbackground,
        color: colors.inputtext,
      },
      searchButton: {
        backgroundColor: colors.solidcolor,
      },
      placeholderTextColor: colors.inputtext,
    }),
    [colors]
  );

  // Trimmed update function
  const handleQueryChange = useCallback(
    text => {
      setQuery(text.trimStart());
    },
    [setQuery]
  );

  return (
    <View style={[styles.make_center, styles.container]}>
      <TextInput
        style={[styles.input, themedStyles.input]}
        placeholder="Search GIF..."
        placeholderTextColor={themedStyles.placeholderTextColor}
        value={query}
        onChangeText={handleQueryChange}
        accessible
        accessibilityLabel="Search GIF input"
      />
      <TouchableOpacity
        style={[styles.make_center, styles.search_container, themedStyles.searchButton]}
        accessible
        accessibilityLabel="Search button">
        <SearchSvg fill={colors.text} />
      </TouchableOpacity>
    </View>
  );
});

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: 'row',
    gap: 5,
  },
  make_center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    height: 45,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
  },
  search_container: {
    width: '15%',
    height: 45,
    borderRadius: 5,
  },
});
