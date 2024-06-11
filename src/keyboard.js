import createNode from './utils/createNode'
import './keyboard.css'
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const keyboard = createNode('div', 'keyboard')
alphabet.forEach((char) => {
  const button = createNode('button', 'btn', char.toUpperCase())
  button.dataset['code'] = char
  keyboard.append(button)
})

export { keyboard }
