const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: '6Broughy.aternos.host',
  port: 24725,
  username: 'AFK_Bot',
  version: '1.21.10' // wersja Twojego serwera
});

bot.once('spawn', () => {
  console.log('Bot wszedł na serwer Aternos!');

  setInterval(() => {
    // losowy skok
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);

    // losowy ruch głową
    bot.look(bot.entity.yaw + (Math.random() - 0.5), bot.entity.pitch, true);
  }, 30000 + Math.random() * 30000); // 30-60 sekund
});

bot.on('end', () => {
  console.log('Bot rozłączony. Poczekaj aż serwer włączy się ponownie.');
});

bot.on('error', err => console.log('Błąd bota:', err.message));
