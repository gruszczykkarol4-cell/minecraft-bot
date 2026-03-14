const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: '6B_SMP.aternos.me',
  port: 24725,
  username: 'AFK_Bot'
})

bot.once('spawn', () => {
  console.log('Bot wszedł na serwer')

  setInterval(() => {
    bot.setControlState('jump', true)

    setTimeout(() => {
      bot.setControlState('jump', false)
    }, 500)

  }, 60000)
})
