import React from "react";
import Layout from "./components/Layout/Layout";
import "./App.css";
import HoofdPagina from "./components/Rekenen/Hoofdpagina";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLtObZCCj1GOV4EdV0JfOnWP9JU1xjpJo",
  authDomain: "rekenapp-5445a.firebaseapp.com",
  projectId: "rekenapp-5445a",
  storageBucket: "rekenapp-5445a.appspot.com",
  messagingSenderId: "888154859587",
  appId: "1:888154859587:web:323f669afae3451ca9ccf6",
  measurementId: "G-BJZ73KWR1Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
//getAnalytics(app);

function App() {
  return (
    <Layout>
      <HoofdPagina />
    </Layout>
  );
}

export default App;
