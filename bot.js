const mineflayer = require('mineflayer')

// --- KONFIGURACJA ---
const config = {
  host: '6B_SMP.aternos.me', // adres serwera
  port: 24725,               // port serwera
  username: 'AFK_Bot',       // nick bota
  version: 1.21.10,            // false = auto-detekcja wersji, można podać np. '1.19.2'
  afkMove: true              // true = bot będzie się lekko ruszał, żeby nie dostać kicka
}

// --- FUNKCJA TWORZENIA BOTA ---
function createBot() {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  })

  bot.once('spawn', () => {
    console.log(`[BOT] Wszedł na serwer ${config.host}:${config.port}`)

    if (config.afkMove) {
      startAFKMovement(bot)
    }
  })

  bot.on('end', () => {
    console.log('[BOT] Rozłączono. Próba ponownego połączenia za 10 sekund...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', err => {
    console.log('[BOT] Błąd:', err.message)
  })

  return bot
}

// --- RUCH AFK ---
function startAFKMovement(bot) {
  // co 30-60 sekund losowo skacze lub chodzi
  setInterval(() => {
    const action = Math.random()
    if (action < 0.5) {
      // skok
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    } else {
      // ruszanie w losową stronę
      const directions = ['forward', 'back', 'left', 'right']
      const dir = directions[Math.floor(Math.random() * directions.length)]
      bot.setControlState(dir, true)
      setTimeout(() => bot.setControlState(dir, false), 1000)
    }
  }, 30000 + Math.random() * 30000) // 30-60 sekund
}

// --- START ---
createBot()
