import './quiz.css'
import createNode from './utils/createNode'
import { keyboard } from './keyboard'

const quiz = createNode('section', 'quizWrapper')
const answerWordNode = createNode('ul', 'wordWrapper')
const hintNode = createNode('h3', 'hintWrapper')
const wrongGuessCount = createNode('p', 'wrongGuessCounter', '0 / 6')

quiz.append(answerWordNode, wrongGuessCount, hintNode, keyboard)

export { quiz, answerWordNode, wrongGuessCount, hintNode }
