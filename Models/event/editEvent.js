const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path');
const Events = require(__dirname + '/../../migrations/events');
const operateInDom = require(__dirname + '/../../libs/operateInDom')

const linkPath = 'http://localhost:3333/event/images'
const imgPath = __dirname + '/../../public' + linkPath
const tmpPath = __dirname + '/../../public/event/tmp'

async function editEvent(id, reqData) {
  const event = await Events.findByPk(id)
  if (!event) return { status: false, msg: 'event not found' }

  let banner = reqData.banner
  if (banner.filename) {
    banner = `${reqData.banner.filename}.${reqData.banner.ext}`
    const bannerOldPath = __dirname + '/../../' + reqData.banner.path
    const bannerNewPath = imgPath + banner
    if (fs.existsSync(oldPath)) {
      fsPromises.rename(bannerOldPath, bannerNewPath)
    }
  }

  const imgAry = []
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
      imgAry.push(img.src)
    })
    return document
  })
  operateInDom(event.content)(document => {
    document.querySelectorAll('img').forEach(img => {
      if (!imgAry.includes(img.src)) {
        const imgPath = imgPath + '.' + path.basename(img.src)
        if (fs.existsSync(imgPath)) {
          fs.unlink(imgPath, () => {})
        }
      }
    })
  })

  try {
    if (!banner) {
      await event.update({ ...reqData, content })
    } else {
      await event.update({ ...reqData, content, banner })
    }
    return {
      status: true,
      data: event
    }
  } catch (error) {
    return {
      status: false,
      msg: error
    }
  }
}

module.exports = editEvent
