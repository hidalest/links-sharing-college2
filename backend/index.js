const PORT = 8000;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const fetch = require('node-fetch');
require('dotenv').config();
morgan('tiny');

const app = express();

const DOCUMENT_ID = '0ca23f95-6806-47f3-9b8a-b1eee8cb21dd';
const COLLECTION = 'task8';

const DOCUMENT_REQUEST_GET_URL = `https://de4dbf8d-859e-47c9-99b9-b01def343c49-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/linksSharing/collections/linksSharingData/0779d200-4226-47d0-8ad5-a2af8ae43264`;

const DOCUMENT_REQUEST_POST_URL = `https://6c9b9407-80c4-4ef3-9319-d276fc5fc94a-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/document/collections/task8/0ca23f95-6806-47f3-9b8a-b1eee8cb21dd`;

const TOKEN_KEYVALUES =
  'AstraCS:HDqbuCqMNhxIBqhwNYWQPmmh:aed3c84671ee3fbd4881a82f9687dd3df6177582cf10707c364e2005e54a0eea';

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-cassandra-token': TOKEN_KEYVALUES,
    },
  };

  fetch(DOCUMENT_REQUEST_GET_URL, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => console.log(error.message));
});

app.post('/', (req, res) => {
  const data = req.body;

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'x-cassandra-token': TOKEN_KEYVALUES,
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(DOCUMENT_REQUEST_POST_URL, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      res.status(201).json({ message: 'POST request successful', data });
      console.log(data);
    })
    .catch((error) => console.log(error.message));
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
