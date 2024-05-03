const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const token = process.env.GIT_TOKEN || 'ab'
const cloudsmithRepository = 'call-team'
const user = 'Shantanu-CometChat';
const repo = 'testingcommit';


app.use(bodyParser.json());

const secret = 'av';

// This middleware validates the incoming webhook
app.use((req, res, next) => {
  next();
});

app.post('/webhook', async (req, res) => {

    const packageName = req.body.data.name;
    const packageVersion = req.body.data.version;
    const repository = req.body.data.repository;

    console.log('Started post webhook')
    console.log(packageName)
    console.log(packageVersion)
    res.status(200).send('OK ');

    switch (packageName) {
      case "@cometchat/chat-sdk-javascript":
        console.log('inside chatSDK');
        break;
      case "chat-uikit-android":
        console.log('inside android');
        try {
          if(repository!=cloudsmithRepository ){
            console.log('repository mismatch')
            return;
          }
          commitToAndroidGitHubSampleApp(packageVersion,packageName)
        }catch (error) {
          console.error('Error during GitHub operations', error);
          res.status(500).send('An error occurred');
        }

        break;
      case "testTrigger":
        console.log('Testing trigger');
        makePostRequestTotriggerEvent(packageVersion,packageName, repository)
        break;
      default:
        console.log('Unknown fruit');
    }

  });


  async function commitToAndroidGitHubSampleApp(param1) {


    const { data: { content, sha } } = await axios.get('https://api.github.com/repos/Shantanu-CometChat/cometchat-sample-app-android-java/contents/README.md', {
        headers: {
          'Authorization': `token ${token}`,
        },
      });

    const newContent = Buffer.from(`${Buffer.from(content, 'base64').toString('utf-8')}\n${param1}\n`).toString('base64');

    await axios.put('https://api.github.com/repos/Shantanu-CometChat/cometchat-sample-app-android-java/contents/README.md', {
        message: 'Updated README.md from Cloudsmith webhook',
        content: newContent,
        sha,
    }, {
        headers: {
            'Authorization': `token ${token}`,
        },
    });
}


async function makePostRequestTotriggerEvent(param1,param2, param3) {
  await axios.post('https://api.github.com/repos/Shantanu-CometChat/plugintesterbyshantanu/dispatches',
  {
      event_type: 'triggered-from-another-repo', // Replace this with your custom event type
      client_payload: {
          version: param1,
          packageName: param2,
          repository: param3
      }
  },
  {
      headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.everest-preview+json'
      }
  });
}



app.listen(3000, () => console.log('Server started'));



