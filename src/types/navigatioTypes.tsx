// src/types/navigationTypes.ts

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type CharacterStackParamList = {
  CharacterDetails: {
    characterId: number;
  };
};

export type CharacterDetailScreenRouteProp = RouteProp<CharacterStackParamList, 'CharacterDetails'>;
export type CharacterDetailScreenNavigationProp = StackNavigationProp<CharacterStackParamList, 'CharacterDetails'>;
