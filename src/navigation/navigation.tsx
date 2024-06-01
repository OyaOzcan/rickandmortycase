import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EpisodeListScreen from '../screens/EpisodeListScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

export type AppStackParamList = {
  EpisodeList: undefined;
  EpisodeDetails: { episodeId: number };
  CharacterDetails: { characterId: number };
  Favorites: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="EpisodeList">
      <Stack.Screen name="EpisodeList" component={EpisodeListScreen} />
      <Stack.Screen name="EpisodeDetails" component={EpisodeDetailScreen} />
      <Stack.Screen name="CharacterDetails" component={CharacterDetailScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
