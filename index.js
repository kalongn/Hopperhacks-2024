'use strict'

const letteresWrapper = document.getElementById("letters-tiles-wrapper");
const amountOfLetter = 7;
const acceptedAnswer = [];

let listOfCharacterOrder = [];
let listOfCharacterAvaliable = new Map;
let answersCharacter = [];
let gameStarted = false;
let score = 0;
let timeLeft = 60; // seconds
let timer;
let currentAnswerIndex = 0;

async function startApp() {
    const filterd_dictionary = await (await fetch('./rsrc/filtered_dictionary.json')).json();
    for (const [word] of Object.entries(filterd_dictionary)) {
        acceptedAnswer.push(word);
    }
    setUpGame();
}

function displayScore() {
    let s = "000" + score;
    document.getElementById('Score').innerText = s.substring(s.length - 4);
}

function displayTime() {
    let minute = "0" + (Math.floor(timeLeft / 60) < 0 ? 0 : Math.floor(timeLeft / 60));
    let second = "0" + (timeLeft % 60 < 0 ? 0 : timeLeft % 60);
    document.getElementById('Time').innerText = minute.substring(minute.length - 2) + ":" + second.substring(second.length - 2);
}

function generateVowels() {
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
    return randomVowel;
}

function generateLetter() {
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    return randomLetter;
}

function displayLetter() {
    let generatedLetter = generateVowels();
    listOfCharacterOrder.push(generatedLetter);
    if (listOfCharacterAvaliable.has(generatedLetter)) {
        listOfCharacterAvaliable.set(generatedLetter, listOfCharacterAvaliable.get(generatedLetter) + 1);
    } else {
        listOfCharacterAvaliable.set(generatedLetter, 1);
    }
    document.getElementById('letter-tile-0').innerHTML = `<p>${generatedLetter}<p/>`;
    for (let i = 1; i < amountOfLetter; i++) {
        let letter = document.getElementById('letter-tile-' + i);
        let generatedLetter = generateLetter();
        if (listOfCharacterAvaliable.has(generatedLetter)) {
            listOfCharacterAvaliable.set(generatedLetter, listOfCharacterAvaliable.get(generatedLetter) + 1);
        } else {
            listOfCharacterAvaliable.set(generatedLetter, 1);
        }
        listOfCharacterOrder.push(generatedLetter);
        letter.innerHTML = `<p>${generatedLetter}<p/>`;
    }
}

function setUpGame() {
    displayScore();
    displayTime();
    displayLetter();
}

function startGame() {
    gameStarted = true;
    timer = setInterval(function () {
        timeLeft--;
        displayTime();
        if (timeLeft <= 0) {
            displayTime();
            clearInterval(timer);
            alert("Game Over");
        }
    }, 1000);
}

function updateWords(length, answer) {
    for (let i = 0; i < length; i++) {
        document.getElementById('answer-tile-' + i).innerHTML = ``;
    }
    for (let i = 0; i < length; i++) {
        let newChar = generateLetter();
        let index = listOfCharacterOrder.join("").indexOf(answer.substring(i, i + 1));
        listOfCharacterOrder[index] = newChar;
        document.getElementById('letter-tile-' + index).innerHTML = `<p>${newChar}<p/>`;
        document.getElementById('letter-tile-' + index).style.opacity = 1;
        if (listOfCharacterAvaliable.has(newChar)) {
            listOfCharacterAvaliable.set(newChar, listOfCharacterAvaliable.get(newChar) + 1);
        } else {
            listOfCharacterAvaliable.set(newChar, 1);
        }
    }
}

function resetButton() {
    while (currentAnswerIndex > 0) {
        currentAnswerIndex--;
        let currentCharacter = answersCharacter.pop();
        listOfCharacterAvaliable.set(currentCharacter, listOfCharacterAvaliable.get(currentCharacter) + 1);
        document.getElementById('answer-tile-' + currentAnswerIndex).innerHTML = ``;
        document.getElementById('answer-tile-' + currentAnswerIndex).style.border = "1px solid rgba(var(--color-black), .3)"
        let index = listOfCharacterOrder.join("").lastIndexOf(currentCharacter);
        while (document.getElementById('letter-tile-' + index).style.opacity == 1) {
            index = listOfCharacterOrder.join("").lastIndexOf(currentCharacter, index - 1);
        }
        document.getElementById('letter-tile-' + index).style.opacity = 1;
    }
}

function restartButton() {
    gameStarted = false;
    resetButton();
    for (let i = 0; i < amountOfLetter; i++) {
        document.getElementById('letter-tile-' + i).style.opacity = 1;
        document.getElementById('letter-tile-' + i).innerHTML = ``;
    }
    answersCharacter = [];
    currentAnswerIndex = 0;
    timeLeft = 60;
    displayTime();
    score = 0;
    listOfCharacterAvaliable = new Map;
    listOfCharacterOrder = [];
    displayScore();
    displayLetter();
    clearInterval(timer);
}

document.addEventListener('keyup', typing => {
    console.log(listOfCharacterAvaliable)
    if (!gameStarted) {
        startGame();
    }
    let letter = typing.key;
    if (listOfCharacterAvaliable.has(letter) && listOfCharacterAvaliable.get(letter) > 0) {
        if (currentAnswerIndex === amountOfLetter) {
            return;
        }
        listOfCharacterAvaliable.set(letter, listOfCharacterAvaliable.get(letter) - 1);
        let index = listOfCharacterOrder.join("").indexOf(letter);
        while (document.getElementById('letter-tile-' + index).style.opacity == 0.5) {
            index = listOfCharacterOrder.join("").indexOf(letter, index + 1);
        }
        document.getElementById('letter-tile-' + index).style.opacity = 0.5;
        answersCharacter[currentAnswerIndex] = letter;
        document.getElementById('answer-tile-' + currentAnswerIndex).innerHTML = `<p>${letter}<p/>`;
        currentAnswerIndex++;
    }
    if (letter === 'Enter') {
        let answer = answersCharacter.join('');
        console.log(answer);
        if (answer.length === 0) {
            return;
        }
        for (let i = 0; i < answer.length; i++) {
            document.getElementById('answer-tile-' + i).style.border = "1px solid rgba(var(--color-black), .3)"
        }
        if (answer.length === 1) {
            timeLeft -= 5;
            displayTime();
            updateWords(answer.length, answer);
            currentAnswerIndex = 0;
            answersCharacter = [];
        }
        if (!acceptedAnswer.includes(answer)) {
            for (let i = currentAnswerIndex - 1; i >= 0; i--) {
                document.getElementById('answer-tile-' + i).style.border = "1px solid red"
            }
            return;
        }
        if (answer.length === 2) {
            updateWords(answer.length, answer);
            score += 5;
            currentAnswerIndex = 0;
            answersCharacter = [];
        }
        if (answer.length >= 3 && answer.length <= 5) {
            updateWords(answer.length, answer);
            score += 10;
            timeLeft += 5;
            currentAnswerIndex = 0;
            answersCharacter = [];
        }
        if (answer.length >= 6) {
            updateWords(answer.length, answer);
            score += 20;
            timeLeft += 15;
            currentAnswerIndex = 0;
            answersCharacter = [];
        }
        displayScore();

    }
    if (letter === 'Backspace' && currentAnswerIndex > 0) {
        currentAnswerIndex--;
        let currentCharacter = answersCharacter.pop();
        listOfCharacterAvaliable.set(currentCharacter, listOfCharacterAvaliable.get(currentCharacter) + 1);
        document.getElementById('answer-tile-' + currentAnswerIndex).innerHTML = ``;
        document.getElementById('answer-tile-' + currentAnswerIndex).style.border = "1px solid rgba(var(--color-black), .3)"
        let index = listOfCharacterOrder.join("").lastIndexOf(currentCharacter);
        while (document.getElementById('letter-tile-' + index).style.opacity == 1) {
            index = listOfCharacterOrder.join("").lastIndexOf(currentCharacter, index - 1);
        }
        document.getElementById('letter-tile-' + index).style.opacity = 1;
    }
})