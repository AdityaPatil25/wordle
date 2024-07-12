import React , {useContext, useEffect} from "react";
import { Appcontext } from "../App";


function Letter ({letterPos,attemptVal}){
    const {board,correctword,currAttempt, setdisabledLetter} = useContext(Appcontext);
    const letter = board[attemptVal][letterPos];

    const correct = correctword[letterPos] === letter;
    const almost = !correct && letter!== "" && correctword.includes(letter);
    
    const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error")
    useEffect(()=> {
        if(letter!=="" &&!correct && !almost){
            setdisabledLetter((prev) => [...prev,letter])
        }
    },[currAttempt.attempt])
    
    return (
        <div className="letter" id={letterState}>
            {letter}
             
        </div>
    )
}
export default Letter