import * as request from './requester';

const baseURL = 'http://localhost:3030/data/comments';

export const getAll = async (gameId) => {
    const query = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: `owner=_ownerId:users`
    });
    const result = await request.get(`${baseURL}?${query}`);

    return result;
};

export const create = async (gameId, username, text) => {
    const newComment = await request.post(baseURL, {
        gameId,
        text
    });

    return newComment;
};