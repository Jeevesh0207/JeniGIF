import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {GifCard, Header, Search, ShareCard} from '../components';
import {fetchTrendingGifs, searchGifs, debounce} from '../utils';

const HomeScreen = ({isDark, setIsDark}) => {
  const theme = useTheme().colors;
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [numColumns, setNumColumns] = useState(2);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oneCardData,setOneCardData] = useState(null)

  const width = Dimensions.get("window").width

  const COLUMN_WIDTH = width/2;

  const loadTrendingGifs = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const newGifs = await fetchTrendingGifs(page * 5);
      setGifs(prev => {
        const uniqueGifs = new Map(prev.map(gif => [gif.id, gif]));
        newGifs.forEach(gif => uniqueGifs.set(gif.id, gif));
        return Array.from(uniqueGifs.values());
      });
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce(async text => {
    if (text.trim()) {
      const results = await searchGifs(text);
      setGifs(results);
    }
  }, 500);

  useEffect(() => {
    if (query.trim()) {
      handleSearch(query);
    }
  }, [query]);

  useEffect(() => {
    const updateNumColumns = () => {
      const screenWidth = Dimensions.get('window').width;
      const calculatedColumns = Math.floor(screenWidth / COLUMN_WIDTH);
      setNumColumns(calculatedColumns || 1);
    };

    updateNumColumns();

    const subscription = Dimensions.addEventListener(
      'change',
      updateNumColumns,
    );

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    loadTrendingGifs();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      loadTrendingGifs();
    }
  }, [query]);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Search query={query} setQuery={setQuery} />
      <FlatList
        data={gifs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GifCard gif={item} setIsModalOpen={setIsModalOpen} setOneCardData={setOneCardData}/>
        )}
        onEndReached={loadTrendingGifs}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.resultContainer}
        numColumns={numColumns}
        key={numColumns}
        ListFooterComponent={
          loading && <ActivityIndicator color={theme.border} />
        }
      />
      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalOpen(false)}
        >
          <ShareCard oneCardData={oneCardData} setIsModalOpen={setIsModalOpen}/>
        </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  resultContainer: {
    padding: 5,
  },
});
