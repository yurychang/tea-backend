const jsdom = require('jsdom')
const { JSDOM } = jsdom

const operateInDom = htmlStr =>
  callback => {
    if (!htmlStr) return
    const contentDOM = new JSDOM(htmlStr)
    const document = contentDOM.window.document
    const dom = callback(document)
    htmlStr = dom.documentElement.outerHTML
    htmlStr = htmlStr.slice(25, -14)
    return htmlStr
  }

module.exports = operateInDom
