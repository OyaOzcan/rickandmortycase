import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'; 
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/favoriteSlice';
import { Character } from '../types/CharacterTypes';
import { useAppSelector, useAppDispatch } from '../redux/hooks';


const FavoritesScreen = () => {
  const favorites = useAppSelector(state => state.favorites.favorites);
  const dispatch = useAppDispatch();

  const handleRemoveFavorite = (id: number, name: string) => {
    Alert.alert(
      'Remove Favorite',
      `Are you sure you want to remove ${name} from favorites?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(removeFavorite(id)),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }: { item: Character }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{`Status: ${item.status}`}</Text>
      <Text>{`Species: ${item.species}`}</Text>
      <TouchableOpacity
        onPress={() => handleRemoveFavorite(item.id, item.name)}
        style={styles.removeButton}
      >
        <Text style={styles.buttonText}>Remove Favorite</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Characters</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FavoritesScreen;
