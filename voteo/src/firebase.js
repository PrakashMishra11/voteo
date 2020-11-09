import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDixA05Uc0XyFr5wE78-BBc5DOjnqBIBKs",
    authDomain: "voteo-b56ca.firebaseapp.com",
    databaseURL: "https://voteo-b56ca.firebaseio.com",
    projectId: "voteo-b56ca",
    storageBucket: "voteo-b56ca.appspot.com",
    messagingSenderId: "316540833793",
    appId: "1:316540833793:web:4c581661d2dd582ae4f000"
};

firebase.initializeApp(config);
export default firebase;
