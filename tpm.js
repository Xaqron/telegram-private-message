// get your token from bot father: https://t.me/BotFather
const token = 'xxxxxxxxx:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(token, {polling: true})

bot.on('message', async (msg) => {
  if (msg.text === '/start') {
    bot.sendMessage(msg.chat.id, `Your id: ${msg.chat.id}`)
  } else {
    let lines, id
    try {
      lines = msg.text.split(/\n+/g)
      id = Number(lines.shift())
      if (isNaN(id)) {
        throw new Error('Wrong Syntax')
      }
      await bot.sendMessage(id, `Sender: ${msg.chat.id}\n\n${lines.join('\n')}`, {parse_mode: 'HTML'})
      bot.sendMessage(msg.chat.id, 'Your message sent')
    } catch (err) {
      if (err.message.indexOf('chat not found') > -1) {
        bot.sendMessage(msg.chat.id, `User has not joined yet.`)
      } else {
        bot.sendMessage(msg.chat.id, `Wrong syntax.\nExample\n\nFriend Id\nYour Message`)
      }
    }
  }
})
