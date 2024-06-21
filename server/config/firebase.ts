import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
// require('dotenv').config()


export default{

    firebaseConfig: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGINGSENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASURE_ID
    },
} 
  

