import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserRouter } from "react-router-dom";


const firebaseConfig = {
  apiKey: "AIzaSyCoNm86faO7tyMHdf6MyazrG_PrujCY42U",
  authDomain: "pokemon-e3cc7.firebaseapp.com",
  projectId: "pokemon-e3cc7",
  storageBucket: "pokemon-e3cc7.appspot.com",
  messagingSenderId: "137844763123",
  appId: "1:137844763123:web:a5ffec1dcaa2faff694a86",
  measurementId: "G-9ZQXPEHNKM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
