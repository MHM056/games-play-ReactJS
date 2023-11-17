import * as request from './requester';

const baseURL = 'http://localhost:3030/jsonstore/games';

export const getAll = async () => {
   const games = await request.get(baseURL);
   return Object.values(games);
};

export const getOne = async (gameId) => {
    const game = await request.get(`${baseURL}/${gameId}`);
    return game;
};

export const create = async (data) => {
    const result = await request.post(baseURL, data);

    return result;
};