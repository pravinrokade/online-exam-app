import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import './QuestionSets.css'

function QuestionSets() {
  const [questionSet, SetQuestionSet] = useState([]);
  const [result, setResult] = useState(0);
  const [retest, setRetest] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = async () => {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    const responseJSON = await response.json();
    SetQuestionSet(responseJSON.results);
  };

    useEffect(() => {
    getData();
    }, [retest]);

  return (
    <div className="main">
      {
        questionSet.length === 0 ?
            <p>Loading...</p> : (
                currentIndex >= questionSet.length || !questionSet[currentIndex] ?
            (<div>
                <h3>Final Score is {result}</h3>
                <p className="button" onClick={() => {
                    SetQuestionSet([]);
                    setResult(0);
                    setCurrentIndex(0);
                    setRetest(prev => !prev);
                    }}>
                    New Exam
                </p>
            </div>) : 
            (<div>
                <p className="heading">Question {currentIndex + 1}/10</p>
                <div className="question">
                    <h3>Category - {questionSet[currentIndex].category}</h3>
                    <p><b>{questionSet[currentIndex].question}</b></p>
                </div>
                <Questions questionSet={questionSet} index={currentIndex} setCurrentIndex={setCurrentIndex} result={result} setResult={setResult} />
                <button className="button" onClick={()=>setCurrentIndex(currentIndex+1)}>Next Question</button>
            </div>
        ))
      }
      {
        
      }
    </div>
  );
}

export default QuestionSets;
