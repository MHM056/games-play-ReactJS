import { useEffect, useState } from "react";
import * as gameService from "../../services/gameService";
import { LatestGame } from "./latest-game/LatestGame";

export const Home = () => {
    const [latestGames, setLatestGames] = useState([]);
    useEffect(() => {
        gameService.getLatest()
        .then(setLatestGames);
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
                {latestGames.length > 0 && (
                    latestGames.map(game => <LatestGame key={game._id} {...game}/>)
                )}
                
                {latestGames.length === 0 && (
                    <p className="no-articles">No games yet</p>
                )}
            </div>
        </section>
    );
};