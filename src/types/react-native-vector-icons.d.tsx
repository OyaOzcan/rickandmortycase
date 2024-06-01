// src/types/react-native-vector-icons.d.ts

declare module 'react-native-vector-icons/FontAwesome' {
    import { Component } from 'react';
    import { TextProperties } from 'react-native';
    
    export interface IconProps extends TextProperties {
      name: string;
      size?: number;
      color?: string;
    }
    
    export default class Icon extends Component<IconProps> {}
  }
  