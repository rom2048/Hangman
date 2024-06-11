import { getRandomWord, userMakeAction } from './main'
import Cross from './assets/cross.svg'
import createNode from './utils/createNode'

const CssClasses = {
  OVERLAY: 'overlay',
  MODAL: 'modal',
  CONTENT: 'modalContent',
  CLOSEWRAPPER: 'closeBtnWrapper',
  CLOSE: 'closeBtn',
  TITLE: 'modalTitle',
  WORD: 'wordNode',
  RESTARTBTN: 'restartBtn',
}

const restart = (e) => {
  closeModal(e)
  getRandomWord()
}

const createModal = (text, word) => {
  const overlayNode = createNode('div', CssClasses.OVERLAY)
  const modal = createNode('div', CssClasses.MODAL)
  const modalContent = createNode('div', CssClasses.CONTENT)
  const btnWrapper = createNode('div', CssClasses.CLOSEWRAPPER)
  const closeBtn = createNode('button', CssClasses.CLOSE)
  closeBtn.insertAdjacentHTML('afterbegin', Cross)
  const restartGame = createNode('button', CssClasses.RESTARTBTN, 'restart')
  restartGame.addEventListener('click', restart)
  const status = createNode('h2', CssClasses.TITLE, text)
  if (word) {
    const wordNode = createNode('p', CssClasses.WORD, `The right word was: ${word}`)
    modalContent.append(status, wordNode, restartGame)
  } else {
    modalContent.append(status, restartGame)
  }
  btnWrapper.append(closeBtn)
  closeBtn.addEventListener('click', closeModal)

  modal.append(btnWrapper, modalContent)
  overlayNode.addEventListener('click', closeModal)
  overlayNode.append(modal)
  document.body.style.overflow = 'hidden'
  document.body.append(overlayNode)
  window.removeEventListener('keypress', userMakeAction)
  window.addEventListener('keyup', restartOnEsc)
}

const closeModal = (e) => {
  if (e.type === 'click') e.stopPropagation()
  document.querySelector('.overlay').remove()
  document.body.style.overflow = 'visible'
  window.addEventListener('keypress', userMakeAction)
}

const restartOnEsc = (e) => {
  if (e.code === 'Escape') {
    restart(e)
  }
}

export { createModal }
