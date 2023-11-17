import * as request from './requester';

const baseURL = 'http://localhost:3030/jsonstore/comments';

export const getAll = async (gameId) => {
    const query = new URLSearchParams({
        where: `gameId="${gameId}"`
    });
    const result = await request.get(baseURL);

    return Object.values(result).filter(comment => comment.gameId === gameId);
};

export const create = async (gameId, username, text) => {
    const newComment = await request.post(baseURL, {
        gameId,
        username,
        text
    });

    return newComment;
};