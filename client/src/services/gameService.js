import * as request from './requester';

const baseURL = 'http://localhost:3030/jsonstore/games';

export const getAll = async () => {
   const games = await request.get(baseURL);
   return Object.values(games);
};

export const create = (data) => {

};