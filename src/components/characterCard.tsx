import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CharacterStackParamList } from '../types/navigatioTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { Character } from '../types/CharacterTypes';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addFavorite, removeFavorite } from '../redux/favoriteSlice';

interface CharacterProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === character.id);
  const navigation = useNavigation<StackNavigationProp<CharacterStackParamList, 'CharacterDetails'>>();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(character.id));
    } else {
      if (favorites.length >= 10) {
        Alert.alert(
          'Limit Exceeded',
          'You have exceeded the number of favorite characters. Please remove a character from favorites before adding a new one.',
          [{ text: 'OK' }]
        );
      } else {
        dispatch(addFavorite(character));
      }
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text>{`Status: ${character.status}`}</Text>
        <Text>{`Species: ${character.species}`}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleFavoriteToggle} style={[styles.favoriteButton, isFavorite ? styles.likedButton : styles.unlikedButton]}>
          <Text style={styles.buttonText}>{isFavorite ? "Remove Favorite" : "Add Favorite"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CharacterDetails', { characterId: character.id })}
          style={styles.detailButton}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  likedButton: {
    backgroundColor: 'red',
  },
  unlikedButton: {
    backgroundColor: '#007BFF',
  },
  detailButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CharacterCard;
