/**
 *  @param {string} tag
 *  @param {string} className
 *  @param {string} text
 *  @returns {HTMLElement}
 */
const createNode = (tag, className, text) => {
  const el = document.createElement(tag)
  if (className) {
    className.split(' ').forEach((name) => el.classList.add(name))
  }
  if (text) {
    el.textContent = text
  }
  return el
}

export default createNode
