import { Request, Response } from 'express';

const PORT = 8000;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const fetch = require('node-fetch');
require('dotenv').config();
morgan('tiny');

const app = express();

const DOCUMENT_ID = '0779d200-4226-47d0-8ad5-a2af8ae43264';
const COLLECTION = 'linksSharingData';

const DOCUMENT_REQUEST_URL = `https://de4dbf8d-859e-47c9-99b9-b01def343c49-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/linksSharing/collections/linksSharingData/0779d200-4226-47d0-8ad5-a2af8ae43264`;

const TOKEN_KEYVALUES =
  'AstraCS:biKMsNZAbFkuBcSJBOsINNGX:4baefb600e82f48f3107ea66d49d50c03007e1d45d57d0b339b8c290a2b0f798';

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-cassandra-token': TOKEN_KEYVALUES,
    },
  };

  fetch(DOCUMENT_REQUEST_URL, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error.message));
});

app.post('/', (req: Request, res: Response) => {
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

  fetch(DOCUMENT_REQUEST_URL, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      res.status(201).json({ message: 'POST request successful', data });
    })
    .catch((error) => {
      console.log('Ooops something went wrong');
      console.log(error.message);
    });
});

app.listen(PORT, () =>
  console.log(`server is running on port asdasdhj ${PORT}`)
);
