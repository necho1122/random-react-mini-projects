import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import express from 'express';
import firebase from 'firebase';


dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.measurementId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

firebase.initializeApp(firebaseConfig);

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/users', (req, res) => {
  const usersRef = firebase.database().ref('users');

  usersRef.on('value', (snapshot) => {
    res.send(snapshot.val());
  });
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const userRef = firebase.database().ref('users').push();
  userRef.set({
    name,
    email,
  });

  res.send({
    message: 'User created',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Initialize Firebase
const App = initializeApp(firebaseConfig);
const analytics = getAnalytics(App);