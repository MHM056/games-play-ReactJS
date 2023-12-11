import * as request from './requester';

const baseURL = 'http://localhost:3030/data/games';

export const getAll = async () => {
    const games = await request.get(baseURL);
    return games;
};

export const getLatest = async () => {
    const query = URLSearchParams({
        offset: 0,
        pageSize: 3
    });

    const latestGames = await request.get(`${baseURL}?sortBy=_createdOn%20desc${query}`);
    
    return latestGames;
}

export const getOne = async (gameId) => {
    const game = await request.get(`${baseURL}/${gameId}`);
    return game;
};

export const create = async (data) => {
    const result = await request.post(baseURL, data);

    return result;
};

export const edit = (gameId, game) => request.put(`${baseURL}/${gameId}`, game);

export const remove = (gameId) => request.del(`${baseURL}/${gameId}`);