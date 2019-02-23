import express from "express";
import BodyParser from 'body-parser'
import indexRoutes from './routes/index'
import webhookRoutes from './routes/webhook'

const app = express().use(BodyParser.json())
const port = process.env.PORT || 5000

app.use('/', indexRoutes);
app.use('/webhook', webhookRoutes);

app.listen(port, (err) => {
  if (err) return console.log('[Server] Something bad happened', err)
  console.log(`[Server] Running on port ${port}`)
})