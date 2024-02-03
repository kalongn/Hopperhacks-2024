import Box from './Box';
import { useState, useEffect, useContext } from 'react';
import { WordAmountContext } from './App';

import styles from './AnswersBoxes.module.css'


function AnswersBoxes() {
  const wordamount = useContext(WordAmountContext);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    let answers = [];
    for (let i = 0; i < wordamount; i++) {
      answers.push('');
    }
    setAnswers(answers);
  }, [wordamount])

  return (
    <div className={`${styles["page-wrapper"]}`}>
      {answers.map((answer, index) => {
        return (
          <Box key={index} answer={answer} />
        )
      })}
    </div>
  )
}

export default AnswersBoxes;