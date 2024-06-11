import './gallow.css'
import createNode from './utils/createNode'
import gallowSVG from './assets/gallows.svg'

const gallowWrapper = createNode('section', 'gallow-wrapper')
const gallowBox = createNode('div', 'gallowBox')
gallowBox.insertAdjacentHTML('afterbegin', gallowSVG)
const gameName = createNode('h1', 'title', 'Hangman Game')
gallowWrapper.append(gameName, gallowBox)

export { gallowWrapper, gallowBox }
