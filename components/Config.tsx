import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'


export const firebaseConfig = {
  apiKey: "AIzaSyDJoWehqxX0uUq9KexwXDCXeRAGX9gSvKM",
  authDomain: "app-log-68c7d.firebaseapp.com",
  databaseURL: "https://app-log-68c7d-default-rtdb.firebaseio.com",
  projectId: "app-log-68c7d",
  storageBucket: "app-log-68c7d.appspot.com",
  messagingSenderId: "239841955802",
  appId: "1:239841955802:web:7ee2777cc7155a5ad37ae3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)