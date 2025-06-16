import React from 'react'
import './QuestionSets.css'

function Questions({questionSet, index, setCurrentIndex, result, setResult}) {
    const questions = [questionSet[index].correct_answer, ...questionSet[index].incorrect_answers];
    
    const shuffleArray = (questions) =>{
        const shuffle = [...questions];
        for(let i= shuffle.length - 1; i>0; i--){
            let j = Math.floor(Math.random()*(i+1));
            [shuffle[i],shuffle[j]]=[shuffle[j],shuffle[i]]
        }
        return shuffle;
    }

    const shuffleAnswers = shuffleArray(questions);

    const handleAnswer = (ans) => {
        if(ans === questionSet[index].correct_answer){
            setResult(result+1);
            setCurrentIndex(index+1);
        } 
        else{
            setCurrentIndex(index+1);
        }
    }

  return (
    <div>
        {
            shuffleAnswers.map((Option, index)=>(
                <p className='option' key={index} onClick={()=>handleAnswer(Option)} >{Option}</p>
            ))
        }
    </div>
  )
}

export default Questions