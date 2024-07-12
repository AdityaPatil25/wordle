import React, { useContext } from "react";
import { Appcontext } from "../App";

function Gameover(){
    const {gameover,setGameover,correctword,currAttempt} = useContext(Appcontext);

    return (
        <div className="gameOver">
            <h3>{gameover.guessedword ? "You Correctly Guessed" : "You Failed"}</h3>
            <h1>Correct : {correctword}</h1>
            {gameover.guessedword && (<h3>You guessed in {currAttempt.attempt} attempts</h3>)} 
        </div>
    )

}
export default Gameover;