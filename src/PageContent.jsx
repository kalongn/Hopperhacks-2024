import StatisticSection from './StatisticSection';
import LetterBoxes from './LettersBoxes';
import AnswersBoxes from './AnswersBoxes';
import GameControl from './GameControl';

import { WordAmountContext } from './App';
import { useState, useEffect, useContext } from 'react';

import styles from './PageContent.module.css'

function PageContent() {

  const [letters, setLetters] = useState([]);
  const [answers, setAnswers] = useState([]);
  const wordamount = useContext(WordAmountContext);

  useEffect(() => {

    function generateVowels() {
      let vowels = ['a', 'e', 'i', 'o', 'u'];
      return vowels[Math.floor(Math.random() * 5)];
    }

    function generateLetter() {
      let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      return letters[Math.floor(Math.random() * 26)];
    }

    function generateLetters() {
      let letters = [];
      letters.push(generateVowels());
      for (let i = 0; i < wordamount - 1; i++) {
        letters.push(generateLetter());
      }
      console.log(letters);
      setLetters(letters);
    }
    generateLetters();
  }, [wordamount])

  return (
    <div className={`${styles["page-wrapper"]}`}>
      <StatisticSection />
      <div className={`${styles["core-game-wrapper"]}`}>
        <AnswersBoxes answers={answers} setLetters={setLetters} />
        <LetterBoxes letters={letters} setAnswers={setAnswers} />
      </div>
      <GameControl />
    </div>
  );
}

export default PageContent;