// get your token from bot father: https://t.me/BotFather
const token = 'xxxxxxxxx:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(token, {polling: true})

bot.on('message', (msg) => {
  if (msg.text === '/start') {
    bot.sendMessage(msg.chat.id, `Your id: ${msg.chat.id}`)
  } else {
    let lines, id, message
    try {
      lines = msg.text.split(/\n+/g)
      id = Number(lines[0])
      lines.shift()
      message = lines.join('\n')
      if (isNaN(id)) {
        throw new Error('Wrong Syntax')
      }
    } catch (err) {
      bot.sendMessage(msg.chat.id, `Wrong syntax.\nExample\n\nFriend Id\nYour Message`)
      return
    }
    bot.sendMessage(id, message, {parse_mode: 'HTML'})
    .then((result) => {
      bot.sendMessage(msg.chat.id, 'Your message sent')
    })
    .catch((err) => {
      console.log(err)
      if (err.message.indexOf('chat not found') > 0) {
        bot.sendMessage(msg.chat.id, `User has not joined yet.`)
      } else {
        bot.sendMessage(msg.chat.id, `Only text and emoji are allowed.`)
      }
    })
  }
})
