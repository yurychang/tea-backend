const Events = require(__dirname + '/../../migrations/events')

async function deleteEvent(id) {
  const event = await Events.findByPk(id)
  event.destroy()
}

module.exports = deleteEvent
