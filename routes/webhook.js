import express from 'express'
import config from '../config'
import botManager from '../helpers/bot-manager'

const router = express.Router();

router.get('/', (req, res) => {
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  /*
   * webhook verification
   */
  if (mode === 'subscribe' && token === config.VERIFY_TOKEN) {
    console.log('[INFO]: New webhook has been verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);      
  }
})

router.post('/', (req, res) => {
  res.sendStatus(200);
  const data = req.body;
  if (data.object === 'page') {
    data.entry.forEach((pageEntry) => {
      if (!pageEntry.messaging) return

      pageEntry.messaging.forEach((messagingEvent) => {
        botManager.eventHandler( messagingEvent )
      });
    });
  }
})

module.exports = router;