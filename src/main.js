import createNode from './utils/createNode'
import './main.css'
import { wordList } from './words'
import { gallowWrapper, gallowBox } from './gallow'
import { hintNode, quiz, wrongGuessCount, answerWordNode } from './quiz'
import { keyboard } from './keyboard'
import { createModal } from './modal'

const CssClasses = {
  MAIN: 'main',
}

let answerArr,
  wrongCount,
  wordToGuess = ''

const gallowParts = [...gallowBox.querySelector('g').children]

const limit = 6

const main = createNode('main', CssClasses.MAIN)
main.append(gallowWrapper, quiz)
document.body.append(main)

const drawAttempts = () => {
  wrongGuessCount.innerText = `${wrongCount} / ${limit}`
}

const resetGame = () => {
  wrongCount = 0
  answerWordNode.innerHTML = ''
  answerArr = Array.from({ length: wordToGuess.length })
    .fill('_')
    .map((ch) => answerWordNode.append(createNode('li', 'char', ch)))
  drawAttempts()
  gallowParts.forEach((part) => (part.style.opacity = 0))
  Array.from(keyboard.children).forEach((btn) => (btn.disabled = false))
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
  wordToGuess = word
  hintNode.innerText = hint
  console.log(word)
  resetGame()
}

const userMakeAction = (event) => {
  let btn
  if (event.type === 'keypress' && event.key.match(/[a-zA-Z]/)) {
    btn = keyboard.querySelector(`[data-code=${event.key.toLowerCase()}]:not(:disabled)`)
  } else if (event.type === 'click') {
    btn = event.target.closest('.btn:not(:disabled)')
  } else {
    createModal('Смени раскладку на EN и используй только текстовые символы!')
  }
  if (btn) {
    const char = btn.dataset.code

    if (wordToGuess.includes(char)) {
      ;[...wordToGuess].map((ch, i) => {
        if (ch === char) {
          answerArr[i] = char
          Array.from(answerWordNode.children)[i].innerText = char
        } else {
          answerArr[i]
        }
      })
    } else {
      gallowParts[wrongCount].style.opacity = 1
      wrongCount += 1
      drawAttempts()
    }
    btn.disabled = true
    if (wrongCount === limit) createModal('Your Loose!', wordToGuess)
    if (answerArr.join('') === wordToGuess) createModal('WIN!', wordToGuess)
  }
}

window.addEventListener('keypress', userMakeAction)
keyboard.addEventListener('click', userMakeAction)

getRandomWord()

export { getRandomWord, userMakeAction }
