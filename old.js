// const axios = require('axios');
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// const token = 'ab';
// const user = 'Shantanu-CometChat';
// const repo = 'testingcommit';


// app.use(bodyParser.json());

// const secret = 'YOUR_CLOUDSMITH_SECRET';

// // This middleware validates the incoming webhook
// app.use((req, res, next) => {
//   next();
// });

// app.post('/webhook', async (req, res) => {


//     console.log('Started post webhook')

//     try {
//       const { data: { content, sha } } = await axios.get('https://api.github.com/repos/Shantanu-CometChat/testingcommit/contents/README.md', {
//         headers: {
//           'Authorization': `token ${token}`,
//         },
//       });

//       const newContent = Buffer.from(`${Buffer.from(content, 'base64').toString('utf-8')}\nhello\n`).toString('base64');

//       await axios.put('https://api.github.com/repos/Shantanu-CometChat/testingcommit/contents/README.md', {
//         message: 'Updated README.md from Cloudsmith webhook',
//         content: newContent,
//         sha,
//       }, {
//         headers: {
//           'Authorization': `token ${token}`,
//         },
//       });

//       res.status(200).send('OK');
//     } catch (error) {
//       console.error('Error during GitHub operations', error);
//       res.status(500).send('An error occurred');
//     }
//   });


// app.listen(3000, () => console.log('Server started'));

