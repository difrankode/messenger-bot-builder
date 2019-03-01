const attachStructure = (template_type, elementsType, elements, additionalProps)=>{
  let payload = {
    template_type: template_type,
    [elementsType]: elements
  }

  if( additionalProps ){
    for(let i in additionalProps){
      payload[i] = additionalProps[i]
    }
  }
  
  return {
    attachment:{
      type: 'template',
      payload: payload
    }
  }
}

const actionStruccture = (id, action) => {
  return{
      recipient: {
        id: id,
      },
      sender_action: action,
  }
}

module.exports = {
  text: (str) => {
    return {
      text: str
    }
  },
  quickReplies: (str, data) => {
    return {
      text: str,
      quick_replies: data
    }
  },
  generic: (elements)=>{
    return attachStructure('generic', 'elements', elements)
  },
  list: (type, elements)=>{
    return attachStructure('list', 'elements', elements, {top_element_style: type})
  },
  buttons: (str, elements)=>{
    return attachStructure('button', 'buttons', elements, {text: str})
  },
  openGraph: (elements)=>{
    return attachStructure('open_graph', 'elements', elements)
  },
  media: (elements)=>{
    return attachStructure('media', 'elements', elements)
  },
  typingOn: (recipientId) => {
    return actionStruccture(recipientId, 'typing_on')
  },
  typingOff: (recipientId) => {
    return actionStruccture(recipientId, 'typing_off')
  },
  markSeen: (recipientId) => {
    return actionStruccture(recipientId, 'mark_seen')
  },
  message: (recipientId, messagePayload) => {
    return {
      recipient: {
        id: recipientId,
      },
      message: messagePayload,
    }
  },
  phoneNumberButton: (phone, title) =>{
    return {
      type: 'phone_number',
      title: title? title : 'Call',
      payload: phone
    }
  },
  location: {
    content_type: 'location'
  },
  userPhoneNumber: {
    content_type: 'user_phone_number'
  },
  userEmail:{
    content_type: 'user_email',
    payload: 'PAYLOAD'
  },
  getStarted: {
    get_started: {
      payload: 'GET_STARTED_PAYLOAD'
    }
  }
}