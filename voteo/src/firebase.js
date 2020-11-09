import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCWDKGzqZxstOnpYB2FlacZT0Mcq7dkMyQ",
  authDomain: "voteo-1c767.firebaseapp.com",
  databaseURL: "https://voteo-1c767.firebaseio.com",
  projectId: "voteo-1c767",
  storageBucket: "voteo-1c767.appspot.com",
  messagingSenderId: "712938539968",
  appId: "1:712938539968:web:4bce1d9733910607a91625"
};

firebase.initializeApp(config);
export default firebase;
