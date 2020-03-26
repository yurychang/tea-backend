const eventsRegisters = require('../../migrations/eventsRegisters')

async function eventRegister(data) {
  try {
    return await eventsRegisters.create(data)
  } catch (error) {
    return false
  }
}

module.exports = eventRegister
