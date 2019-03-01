import bot from './bot'
import template from './bot-templates'

const grettingsCallback = (id, timestamp)=>{
  return template.buttons('Welcome my friend.', [
    {
      type: 'postback',
      title: 'Click me',
      payload: 'CLICK_PAYLOAD'
    }
  ])
}

// bot.receive('payload', 'GET_STARTED_PAYLOAD', grettingsCallback)

bot.receive('text', /^hi/, grettingsCallback)

bot.receive('payload', 'CLICK_PAYLOAD', (id, timestamp) => {
  return template.text('Wow!! works.')
})

bot.receive('image', (id, message, timestamp) => {
  return template.text('I can receive image, but I have nothing programmed for it')
})

bot.receive('audio', (id, message, timestamp) => {
  return template.text('I can receive audio, but I have nothing programmed for it')
})

bot.receive('location', (id, message, timestamp) => {
  return template.text('I can receive location, but I have nothing programmed for it')
})

module.exports = bot