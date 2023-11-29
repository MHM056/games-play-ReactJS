import { useEffect, useState } from "react";
import * as gameService from "../../services/gameService";
import { LatestGame } from "./latest-game/LatestGame";

export const Home = () => {
    const [latestGames, setLatestGames] = useState([]);
    useEffect(() => {
        gameService.getAll()
        .then(result => {
            let lastThreeGames;
            switch (result.length) {
                case 1: 
                case 2: 
                case 3: lastThreeGames = result.slice(); break;
                default: lastThreeGames = result.slice(result.length - 3); break;
            }
            
            setLatestGames(lastThreeGames);
        })
    }, []);

    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {latestGames.map(game => <LatestGame key={game._id} {...game}/>)}
                
                {latestGames.length === 0 && (
                    <p className="no-articles">No games yet</p>
                )}
            </div>
        </section>
    );
};