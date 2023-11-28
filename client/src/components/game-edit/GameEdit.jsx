import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import * as gameService from "../../services/gameService";

export const GameEdit = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    
    const onEditGameSubmit = async (data) => {
        await gameService.create(data);
        
        navigate('/games');
    };
    
    useEffect(() => {
        gameService.getOne(gameId)
        .then(setGame)
    }, []);
    
    const { values, onChange, onSubmit } = useForm(onEditGameSubmit, game);


    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input value={values.title} onChange={onChange} type="text" id="title" name="title" placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input value={values.category} onChange={onChange} type="text" id="category" name="category" placeholder="Enter game category..." />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input value={values.maxLevel} onChange={onChange} type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" />

                    <label htmlFor="game-img">Image:</label>
                    <input value={values.imageUrl} onChange={onChange} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={values.summary} onChange={onChange}></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />
                </div>
            </form>
        </section>
    );
};