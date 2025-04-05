import React from "react"
import Language from "./components/language"
import MissComp from "./components/misscomp"
import Key from "./components/key"
import clsx from "clsx"
import { languages } from "./languages"
import { getFarewellText,getRandomWord } from "./utils"
/**
 * Project planning:
 * 
 * Questions to ask yourself before writing any code:
 * 
 * - What are the main containers of elements I need
 *   in this app?
 * 
 * 
 * - What values will need to be saved in state vs.
 *   what values can be derived from the state?
 * 
 * 
 * - How will the user interact with the app? What
 *   events do I need to handle?
 * 
 * 
 */

export default function Hangman() {
    
    const[word,setWord]=React.useState(()=>getRandomWord().toUpperCase())
    const[chosen,setChosen]=React.useState([]);
    function setLetter(letter){
        setChosen(prev=>
            prev.includes(letter) ? prev : [...prev,letter]
        )

    }
    
    function nrInc(){
        let aux=0;
        for(let i=0 ; i<chosen.length ; i++){
            if(word.includes(chosen[i]))
                aux++;
        }
        return chosen.length-aux;
    }
    const wrongGuess=nrInc();
    const isGameLost=wrongGuess>=languages.length-1;
    const isGameWon=word.split("").every(letter=>chosen.includes(letter));
    const isGameOver=isGameLost || isGameWon
   // console.log(isGameOver);
    //console.log(wrongGuess)
    //console.log(chosen);
    const langElem=languages.map((item,index)=>{
        const styles={
            backgroundColor:item.backgroundColor,
            color:item.color
        }
        const cross=index<wrongGuess;
        return(
            <div className={`lang-div ${cross ? "lost" : ""}`} style={styles}>{item.name}</div>
        )
    })
    const startIndex=Math.floor(Math.random() * wrongGuess);
    const farewellArr=languages.slice(wrongGuess-1,wrongGuess).map(item=>item.name);
    const message=getFarewellText(farewellArr)
    console.log(message);
    let letok=false;
    const abc=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const abcArr=abc.map((item)=>{
        const isguessed=chosen.includes(item);
        const iscorrect=isguessed && word.includes(item)
        const iswrong=isguessed && !word.includes(item)
        letok=iscorrect
        const className=clsx({
            correct: iscorrect,
            wrong: iswrong
        })
      //  console.log(className)
        return(
            <button 
                className={className}
                key={item}
                onClick={()=>setLetter(item)}
                disabled={isGameOver}
            >
                {item.toUpperCase()}
            </button>
        )
    })
    function restartGame(){
        setWord(getRandomWord().toLocaleUpperCase());
        setChosen([]);
    }
    const wordElem=word.split("").map((item,index)=>{
        if(isGameOver===false){
            return <div className="miss-letter" key={index}>{chosen.includes(item) ? item : ""}</div>
        }
        else{
            return <div className="miss-letter" key={index}>{item}</div>
        }
    })
    return (
        <main>
            <header className="game-tit">
                <h1>Assebly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assebly</p>
            </header>
            {
                isGameWon ? 
                <section className="game-status won">
                    <h2>You win!</h2>
                    <p>Well done!</p>
                </section> :
                isGameLost ?
                <section className="game-status lost">
                    <h2>You lost!</h2>
                    <p>You better learn Assemby!</p>
                </section> :
                <section className={`game-status ${(!word.includes(chosen[chosen.length-1]) && chosen.length>=1) ? "wrong" : ""}`}>
                    {(!word.includes(chosen[chosen.length-1]) && chosen.length>=1) ? message : ''}
                </section>
            }
            
            <section className="lang-cont">
                {langElem}
            </section>
            <section className="miss-cont">
                {wordElem}
            </section>
            <section className="alph-cont">
                {abcArr}
            </section>
            {isGameOver===true && <button className="new-game" onClick={restartGame}>New Game</button>}
        </main>
    )
}