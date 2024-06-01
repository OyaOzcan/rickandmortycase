import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchEpisodes } from '../services/apiService';
import PaginationComponent from '../components/PaginationComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

type EpisodeListStackParamList = {
  EpisodeList: undefined;
  EpisodeDetails: { episodeId: number };
  Favorites: undefined; // Add this line to include the Favorites screen
};

type EpisodeListScreenNavigationProp = StackNavigationProp<EpisodeListStackParamList, 'EpisodeList'>;
type EpisodeListScreenRouteProp = RouteProp<EpisodeListStackParamList, 'EpisodeList'>;

interface EpisodeListScreenProps {
  navigation: EpisodeListScreenNavigationProp;
  route: EpisodeListScreenRouteProp;
}

const EpisodeListScreen: React.FC<EpisodeListScreenProps> = ({ navigation }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadEpisodes = async () => {
      const response = await fetchEpisodes(currentPage);
      const data: ApiResponse = response.data;
      setEpisodes(data.results);
      setTotalPages(data.info.pages);
    };

    loadEpisodes();
  }, [currentPage]);

  const renderEpisodeItem = ({ item }: { item: Episode }) => (
    <TouchableOpacity
      style={styles.episodeItem}
      onPress={() => navigation.navigate('EpisodeDetails', { episodeId: item.id })}
    >
      <Text style={styles.episodeName}>{item.name}</Text>
      <Text style={styles.episodeDetails}>{item.episode} - {item.air_date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Episodes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.favoritesButton}>
          <Text style={styles.favoritesButtonText}>Favorites</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEpisodeItem}
        contentContainerStyle={styles.listContainer}
      />
      <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  favoritesButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  favoritesButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  episodeItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  episodeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  episodeDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default EpisodeListScreen;
