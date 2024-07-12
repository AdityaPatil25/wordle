import { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { createContext } from 'react'
import { boarddefault , generateWordSet} from './words'
import Gameover from './components/Gameover'

export const Appcontext = createContext();


function App() {
  const [board,setBoard] = useState(boarddefault);
  const [currAttempt, setcurrAttempt] = useState({attempt : 0, letterPos : 0})
  const [wordSet, setwordSet] = useState(new Set())
  const [disabledLetter, setdisabledLetter] = useState([]);
  const [gameover,setGameover] = useState({gameover:false, guessedword: false})
  const [theword,settheword] = useState("");

  const correctword = theword.toUpperCase();
   
  useEffect(()=> {
    generateWordSet().then((words)=> {
      setwordSet(words.wordSet);
      settheword(words.chooseword);
    });
  },[])

  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4)return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setcurrAttempt({...currAttempt, letterPos : currAttempt.letterPos+1})  
  }

  const onDelete = () => {
    if(currAttempt.letterPos === 0)return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setcurrAttempt({...currAttempt, letterPos : currAttempt.letterPos - 1});
  }

  const onEnter = ()=> {
    if(currAttempt.letterPos !== 5)return;

    let currWord = "";
    for(let i = 0; i<5 ;i++){
      currWord += board[currAttempt.attempt][i].toLowerCase();
    }
    if(wordSet.has(currWord.toLowerCase())) {
      setcurrAttempt( {attempt : currAttempt.attempt + 1, letterPos : 0})
      if(currWord === correctword.toLowerCase()){
        setGameover({gameover: true, guessedword: true})
        return;
      }
      if(currAttempt.attempt === 5 ){
        setGameover({gameover: true, guessedword:false})
      }
    }
    else {
      alert("Word not found");
    }
    
  }

  return (
    <>
    <div className='App'>
      <nav>
        <h1>Wordle</h1>
      </nav>
      <Appcontext.Provider value = {{board,setBoard,currAttempt,setcurrAttempt,onSelectLetter,onDelete,onEnter,correctword,
        disabledLetter, setdisabledLetter,gameover,setGameover
      }}>
        <div className="game">
        <Board />
        {gameover.gameover ? <Gameover /> : <Keyboard/>}
        </div>
      </Appcontext.Provider>
    </div>
    </>
  )
}

export default App
