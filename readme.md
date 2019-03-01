# Messenger bot builder

A basic javascript project to build a big messenger bot

## Environment
- Clone this project ` $ git clone <url>  && cd messenser-bot-builder`  
- Copy `config.example.js`  file `$ cp config.example.js config.js`
- Open `config.js` and add your app credentials
### Without dokcer
- Run `npm install` or `yarn` command
### With docker and compose
- Run `docker-compose up -d` command
- Access to container, run `docker exec -it bot-builder-node bash`  coomand
- run `$ npm install` or `yarn` command
## Configuration
**ACCESS_TOKEN**:  You get it in the messenger configuration product
**PAGE_TOKEN**: Page token, no used for now
**VERIFY_TOKEN**: A custom string to webhook validation
**APP_ID**: Your app ID, no used for now
## Run server
- Run `npm run start` or `yarn start` inside the docker container
- Run `./ngrok http 5000` (The project is prepared to use that port) outside the docker container
- Copy https url and add `/webhook` path
- Update your webhook suscription in your app

## Bot Manager
The `helpers/bot-manager.js` file is the one that handles what the bot receives and responds.

The types of message receive are:

- **text**: A user typing a text or send emoticons
- **payload**: A user pressed a button that the bot sent
- **image**: A user sends a picture or an emoji (is a gif)
- **audio**: A user sends an audio from a device
- **location**: A user sends his location

To manage a text or payload use next syntax:
`bot.receive(<type>, <(a text or RegExp) or (payload name)>, <callback>)`

The callback receive two params, user id and timestamp

To manage a image, audio or location, use next syntax:
`bot.receive(<type>, <callback>)`

The callback receive three params: user id, message sent by user and timestamp

> The callback always respond one template

## Templates

The templates is the bot response model. There are several types:

- text: syntax: `template.text('<text>')`
- quick_replies: ([documentation](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)) syntax: `template.quickReplies('<text>', [<items>])`
- generic: ([documentation](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic)) syntax: `template.generic([<items>])`
- list: ([documentation](https://developers.facebook.com/docs/messenger-platform/send-messages/template/list)), syntax: `template.list('<type>', [<items>])`
- buttons: ([documentation](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button)) syntax: `template.buttons('<text>', [<items>])`
- open_graph: ([documentation](https://developers.facebook.com/docs/messenger-platform/send-messages/template/open-graph)) syntax: `template.openGraph([<items>])`
- media: ([documentation](https://developers.facebook.com/docs/messenger-platform/send-messages/template/media)) syntax: `template.media([<items>])`

Example:
```
template.buttons('Welcome my friend.', [
  {
    type: 'postback',
    title: 'Click me',
    payload: 'CLICK_PAYLOAD'
  }
])
```

### Predefined templates

#### Phone Number

Template for users to contact you.

Syntax: `template.phoneNumberButton(<number>, <title>)`

Example:
```
template.buttons('Need you assintance', [
  ...,
  template.phoneNumberButton('+584241707647', 'You can call me'),
  ...
])
```

#### User's phone number

Request the user's phone number

Syntax: `template.userPhoneNumber`

> This only can be used on quick replies template

Example:
```
template.quickReplies('Share your location', [
  ...,
  template.userPhoneNumber,
  ...
])
```

#### User's email

Request the user's email

Syntax: `template.userEmail`

> This only can be used on quick replies template

Example:
```
template.quickReplies('Share your email', [
  ...,
  template.userEmail,
  ...
])
```

#### User's Location

Request the user's location

Syntax: `template.location`

> This only can be used on quick replies template

Example:
```
template.quickReplies('Share your location', [
  ...,
  template.location,
  ...
])
```

## "Get started" button

To enable the "get started" button, go to `app.js` file and uncomment the next line:

```
bot.enableGetStartedButton();
```
also in the `helpers/bot-manage.js` file

```
bot.receive('payload', 'GET_STARTED_PAYLOAD', grettingsCallback)
```

To delete this option, see the [documentation](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/#delete)