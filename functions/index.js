/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// import { getDocs } from "@firebase/firestore";
// import { app } from "firebase-admin";
// import {
//   onDocumentWritten,
//   onDocumentCreated,
//   onDocumentUpdated,
//   onDocumentDeleted,
//   Change,
//   FirestoreEvent
// } from "firebase-functions/v2/firestore";

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.

const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");



const { app } = require("firebase-admin");
const axios = require('axios');

initializeApp();
const api = axios.create({
  withCredentials: true,
  baseURL: 'https://april-server.ru/api',


  headers: {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },

})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});



// exports.clientFields = onDocumentCreated("/clients/{clientId}", async (event) => {

//   const db = getFirestore();
//   let fields = []
//   const fieldsRef = db.collection('fields');
//   const fetchedFields = await fieldsRef.get();

//   fetchedFields.forEach((doc) => {
//     let field = doc.data()
//     if (field.isЕditableBitrix == true || field.isЕditableValue == true) {
//       fields.push(field)
//     }

//   })

//   logger.info('client');
//   logger.info(event.data.data(), { structuredData: true });
//   logger.info('fields');
//   logger.info(fields, { structuredData: true });


//   return await event.data.ref.set({ fields: fields }, { merge: true });


// });



// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.setNewClient = onRequest(
  { cors: true },
  async (req, res) => {
    const db = getFirestore();
    // Grab the text parameter.
    const clientData = req.body;
    let data = clientData.data


    let fields = []
    const fieldsRef = db.collection('fields');
    const fetchedFields = await fieldsRef.get();

    fetchedFields.forEach((doc) => {
      let field = doc.data()
      if (field.isЕditableBitrix == true || field.isЕditableValue == true) {
        fields.push(field)
      }

    })


    // let products = []
    // const productsRef = db.collection('products');
    // const fetchedproducts = await productsRef.get();

    // fetchedproducts.forEach((doc) => {
    //   let product = doc.data()
    //   logger.info(product);
    //   products.push(product)


    // })




    let searchingCounter = 0
    const countersRef = db.collection('counters').doc('clients');
    const fetchedCounters = await countersRef.get();

    if (fetchedCounters.exists) {
      // fetchedCounters.forEach((doc) => {
      let counter = fetchedCounters.data()
      logger.info('counter')
      logger.info(counter)

      searchingCounter = counter.value


      // })
    }

    searchingCounter = Number(searchingCounter) + 1
    await db
      .collection('counters')
      .doc('clients')
      .set({ value: searchingCounter });



    let clients = []
    let clientsCount = 0
    const clientsRef = db.collection('clients');
    const clientsFields = await clientsRef.get();

    clientsFields.forEach((doc) => {
      let client = doc.data()
      if (client.domain == data.domain) { //ищет не существует ли клиент с таким доменом
        clientsCount++
      }

    })


    if (clientsCount === 0) {
      const writeResult = await db
        .collection("clients")
        .add({ ...data, number: searchingCounter, fields });

      let clientSnapshot = await writeResult.get();
      let client = clientSnapshot.data();

      try {
        const apiResponse = await api.post("/client", {
          domain: data.domain, key: data.key, hook: data.hook
        });

        logger.log('apiResponse.data');
        logger.log(apiResponse.data);
      } catch (error) {
        logger.error('Error making POST request:', error);

      }

      res.json({ result: { resultCode: 0, client } });



    } else {
      res.json({ result: { resultCode: 1, message: 'Client is allready exist!' } });
    }

  });


// exports.addProductsForClient = onDocumentCreated("clients/{clientId}", async (event) => {
//   // Get an object representing the document
//   // e.g. {'name': 'Marie', 'age': 66}
//   const db = getFirestore();



//   function chunkArray(array, chunkSize) {
//     logger.info(array)
//     let index = 0;
//     let arrayLength = array.length;
//     let tempArray = [];

//     for (index = 0; index < arrayLength; index += chunkSize) {
//       let chunk = array.slice(index, index + chunkSize);
//       tempArray.push(chunk);
//     }

//     return tempArray;
//   };


//   const snapshot = event.data;
//   if (!snapshot) {
//     console.log("No data associated with the event");
//     return;
//   }
//   // const data = snapshot.data();

//   // access a particular field as you would any JS property
//   const clientId = snapshot.id;

//   logger.info('number')
//   logger.info(clientId)
//   const productsSnapshot = await db.collection('products').get();
//   const products = productsSnapshot.docs.map(doc => doc.data());

//   // Разбиваем продукты на группы по 500
//   const productChunks = chunkArray(products, 500);

//   // Для каждой группы продуктов...
//   for (let i = 0; i < productChunks.length; i++) {
//     // Создаем новую коллекцию "ClientProducts" и добавляем в нее продукты с clientId
//     const batch = db.batch();
//     productChunks[i].forEach((product) => {
//       const docRef = db.collection('ClientProducts').doc(); // автоматическое создание ID документа
//       batch.set(docRef, { clientId, ...product }); // добавляем в каждый продукт clientId
//     });
//     await batch.commit(); // записываем все продукты за один раз
//   }







//   // perform more operations ...
// });