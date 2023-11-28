import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from "../../contexts/authContext";

import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

export const GameDetails = () => {
    const { email, userId, isAuthenticated } = useContext(AuthContext);
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [comment, setComment] = useState('');
    const [gameComments, setGameComments] = useState([]);
    const isUserLoggedAndNotAuthor = isAuthenticated && userId != game._ownerId;

    useEffect(() => {
        gameService.getOne(gameId)
            .then(setGame);

        commentService.getAll(gameId)
            .then(setGameComments);
    }, [gameId]);

    const onCommentChange = (e) => {
        setComment(e.target.value);
    };

    const addCommentHandler = async (e) => {
        e.preventDefault();

        const newComment = await commentService.create(
            gameId,
            comment
        );

        setComment('');
        setGameComments(state => [...state, { ...newComment, author: { email } }]);
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {gameComments.map(({ _id, text, owner: { email } }) => (
                            <li key={_id} className="comment">
                                <p>{email}: {text}</p>
                            </li>
                        ))}
                    </ul>

                    {gameComments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {userId === game._ownerId && (
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                    <Link to={`/games/${gameId}/delete`} className="button">Delete</Link>
                </div>
                )}
            </div>

            {isUserLoggedAndNotAuthor && (
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={onCommentChange}></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
            )}

        </section>
    );
};