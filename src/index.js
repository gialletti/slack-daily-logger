require('dotenv').config();

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const qs = require('querystring');
const f = require('./formatter');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h2>Daily log bot currently running 👌</h2>');
});

// Daily log command

app.post('/daily', (req, res) => {
  const {
    token,
    channel_id,
    user_id,
    user_name,
    text
  } = req.body;

  res.send('');

  if (token === process.env.SLACK_VERIFICATION_TOKEN) {
    axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
      token: process.env.SLACK_ACCESS_TOKEN,
      channel: channel_id,
      // username: 'DevLogger 📎',
      as_user: true,
      // text: '<@' + user_id + '|' + user_name + '>\'s Daily Log',
      attachments: JSON.stringify([
        {
          fields: f.format(text),
        },
      ]),
    })).then((result) => {
      console.log('Confirmation', result.data);
    }).catch((err) => {
      console.log('Confirmation error', err);
    });
  } else {
    console.log('Request verification token mismatch', req.body);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
