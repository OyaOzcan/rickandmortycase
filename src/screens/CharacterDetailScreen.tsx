import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type CharacterStackParamList = {
  CharacterDetails: {
    characterId: number;
  };
};

type CharacterDetailScreenRouteProp = RouteProp<CharacterStackParamList, 'CharacterDetails'>;
type CharacterDetailScreenNavigationProp = StackNavigationProp<CharacterStackParamList, 'CharacterDetails'>;

interface CharacterDetailScreenProps {
  route: CharacterDetailScreenRouteProp;
  navigation: CharacterDetailScreenNavigationProp;
}

const CharacterDetailScreen: React.FC<CharacterDetailScreenProps> = ({ route, navigation }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
        setCharacter(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [characterId]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.detailText}>{`Status: ${character.status}`}</Text>
      <Text style={styles.detailText}>{`Species: ${character.species}`}</Text>
      <Text style={styles.detailText}>{`Gender: ${character.gender}`}</Text>
      <Text style={styles.detailText}>{`Origin: ${character.origin.name}`}</Text>
      <Text style={styles.detailText}>{`Last known location: ${character.location.name}`}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignSelf: 'center',
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center'
  }
});

export default CharacterDetailScreen;
