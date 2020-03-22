const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path');
const Events = require(__dirname + '/../../migrations/events');
const operateInDom = require(__dirname + '/../../libs/operateInDom')

const linkPath = 'http://localhost:3000/event/images/'
const imgPath = __dirname + '/../../public' + linkPath
const tmpPath = __dirname + '/../../public/event/tmp/'

async function addEvent(reqData) {
  let banner = ''
  if (reqData.banner) {
    banner = `${reqData.banner.filename}.${reqData.banner.ext}`
    const bannerOldPath = __dirname + '/../../' + reqData.banner.path
    const bannerNewPath = imgPath + banner
    if (fs.existsSync(bannerOldPath)) {
      fsPromises.rename(bannerOldPath, bannerNewPath)
    }
  }

  const content = operateInDom(reqData.content)(document => {
    document.querySelectorAll('script').forEach(s => s.remove())
    document.querySelectorAll('img').forEach(img => {
      const imgName = path.basename(img.src)
      const oldPath = `${tmpPath}${imgName}`
      const newPath = `${imgPath}${imgName}`
      if (fs.existsSync(oldPath)) {
        fsPromises.rename(oldPath, newPath)
      }
      img.src = linkPath + imgName
    })
    return document
  })

  try {
    const event = await Events.create({
      ...reqData,
      content,
      banner
    })
    if (event) {
      return {
        status: true
      }
    } else {
      return {
        status: false,
        msg: 'create fail'
      }
    }
  } catch (error) {
    return {
      status: false,
      msg: error
    }
  }
}

module.exports = addEvent
