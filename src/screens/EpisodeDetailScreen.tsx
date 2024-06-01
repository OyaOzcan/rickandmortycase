import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import CharacterCard from '../components/characterCard';
import PaginationComponent from '../components/PaginationComponent';

type EpisodeStackParamList = {
  EpisodeDetails: {
    episodeId: number;
  };
};

type EpisodeDetailScreenRouteProp = RouteProp<EpisodeStackParamList, 'EpisodeDetails'>;
type EpisodeDetailScreenNavigationProp = StackNavigationProp<EpisodeStackParamList, 'EpisodeDetails'>;

interface EpisodeDetailScreenProps {
  route: EpisodeDetailScreenRouteProp;
  navigation: EpisodeDetailScreenNavigationProp;
}

const EpisodeDetailScreen: React.FC<EpisodeDetailScreenProps> = ({ route, navigation }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);
        setEpisode(response.data);

        // Fetch character details
        const characterPromises = response.data.characters.map((url: string) => axios.get(url));
        const characterResponses = await Promise.all(characterPromises);
        const characterData = characterResponses.map(res => res.data);
        setCharacters(characterData);
        setFilteredCharacters(characterData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeDetails();
  }, [episodeId]);

  useEffect(() => {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.species.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchQuery, characters]);

  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode?.name}</Text>
      <Text>{`Air Date: ${episode?.air_date}`}</Text>
      <Text>{`Episode: ${episode?.episode}`}</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name, status or species"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.subtitle}>Characters:</Text>
      <ScrollView style={styles.scrollView}>
        {paginatedCharacters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </ScrollView>
      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(filteredCharacters.length / itemsPerPage)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
});

export default EpisodeDetailScreen;
