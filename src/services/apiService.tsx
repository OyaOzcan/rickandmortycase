import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = async (page: number) => {
  return axios.get(`${BASE_URL}/episode?page=${page}`);
};

export const fetchEpisodeDetails = async (id: number) => {
  return axios.get(`${BASE_URL}/episode/${id}`);
};

export const fetchCharacter = async (id: number) => {
  return axios.get(`${BASE_URL}/character/${id}`);
};
