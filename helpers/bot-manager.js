import bot from './bot'
import template from './bot-templates'
import regexp from './regexp'

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

bot.receive('quick_reply', (id, message, timestamp) => {
  let type = ''
  if( regexp.email.test( message ) ){
    // on receiving an email code
    type = ' for your email'

  }else if( regexp.phone.test( message ) ){
    // on receiving a phone code
    type = ' for your phone'

  }else{
    // any other
  }

  return template.text(`Thanks${type}, I do not need it anyway`)
})

module.exports = bot