import castArray from 'lodash/castArray';
import api from './api';
import botTemplates from  './bot-templates';

class Bot{

  constructor(){
    this.textMessages = []
    this.postbacks = []
    this.handleReceiveImage;
    this.handleReceiveAudio;
    this.handleReceiveLocation;
  }

  addHandlerMessage(textMessage, callback){
    this.textMessages.push({
      textMessage: textMessage,
      response: callback
    })
  }

  addHandlerPostback(payload, callback){
    this.postbacks.push({
      payload: payload,
      response: callback
    })
  }

  receive(){
        
    if( arguments[0] == 'text' && 
      (typeof arguments[1] == 'string' || arguments[1] instanceof RegExp ) &&
      typeof arguments[2] == 'function'){

        this.addHandlerMessage(arguments[1], arguments[2])

    }else if( arguments[0] == 'payload'&& 
      typeof arguments[1] == 'string' &&
      typeof arguments[2] == 'function'){
      
        this.addHandlerPostback(arguments[1], arguments[2])
        
    }else if( arguments[0] == 'audio' &&
      typeof arguments[1] == 'function'){

        this.handleReceiveAudio = arguments[1]
            
    }else if( arguments[0] == 'image' &&
      typeof arguments[1] == 'function' ){
        this.handleReceiveImage = arguments[1]

    }else if( arguments[0] == 'location' &&
      typeof arguments[1] == 'function' ){
        this.handleReceiveLocation = arguments[1]
    }else{
      // 
    }
  }

  handleReceiveMessage (event) {
    const clientMessage = event.message;
    const senderId = event.sender.id;
    const timestamp = event.timestamp;
    let template;
    
    this.sendReadReceipt(senderId);
    
    if( clientMessage.text ){
      /*
       * handle text messages
       */
      this.textMessages.forEach( message => {
        let textMessage = clientMessage.text.toLowerCase()
        let matchText = message.textMessage == textMessage
        let matchRegExp = message.textMessage instanceof RegExp && message.textMessage.test( textMessage )
        
        if( matchText || matchRegExp ){
          template = message.response( senderId, timestamp )
        }
      })

    }else{
      /*
       * handle attachments messages
       */
      clientMessage.attachments.forEach( attached => {
        if( attached.type == 'audio' && this.handleReceiveAudio){
          template = this.handleReceiveAudio(senderId, attached, timestamp)
          
        }else if( attached.type == 'image' && this.handleReceiveImage){
          template = this.handleReceiveImage(senderId, attached, timestamp)

        }else if( attached.type == 'location' && this.handleReceiveImage){
          template = this.handleReceiveLocation(senderId, attached, timestamp)
  
        }else{
          console.log(`[WARN]: there is no event handler for type: ${attached.type}`)
        }
      })
    }

    if( template ){
      this.sendMessage( senderId, template )
    }else{
      console.log(`[WARN]: there is no a template`)
    }
  }

  handleReceivePostback(event){
    const type = event.postback.payload;
    const senderId = event.sender.id;
    const timestamp = event.timestamp;
    /*
     * handle postbacks messages
     */
    this.postbacks.forEach( postback => {
      if( postback.payload == type){
        let template = postback.response(senderId, timestamp)
        this.sendMessage( senderId, template )
      }
    })
  }

  /*
   * handler events
   */
  eventHandler(messagingEvent) {
    console.log('[Messaging Event]:', JSON.stringify(messagingEvent))
    if (messagingEvent.message) {
      this.handleReceiveMessage(messagingEvent);
    }

    if (messagingEvent.postback) {
      this.handleReceivePostback(messagingEvent);
    }
  }

  sendMessage(recipientId, messagePayloads){
    const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => botTemplates.message(recipientId, messagePayload) );

    api.callMessagesAPI([
      botTemplates.typingOn(recipientId),
      ...messagePayloadArray,
      botTemplates.typingOff(recipientId),
    ]);
  }

  sendReadReceipt (recipientId) {
    api.callMessagesAPI( botTemplates.markSeen( recipientId ) );
  };
  
  enableGetStartedButton () {
    api.callMessengerProfileAPI( botTemplates.getStarted );
  }
}

export default new Bot()