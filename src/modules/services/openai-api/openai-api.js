import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from "../secret/secret";
import { initializeApp } from "firebase/app";


export const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export const aitest = async () => {

  
        const testFunction = httpsCallable(functions, 'aitest');
        try {
            debugger
        const test = await testFunction()
        console.log(test)
        } catch (error) {
            console.log(error)
            debugger
        }
        
        


}