/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require('axios');


const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

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


// exports.helloWorld = onRequest((request, response) => {
//     logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });



exports.client = onRequest(
  { cors: true },
  async (req, res) => {
    //name, email, domain, placementKey, hookKey
    const db = getFirestore();

    const clientData = req.body;
    let data = clientData.data
    logger.info('data')
    logger.info(data)

    let fields = []
    const fieldsRef = db.collection('fields');
    const fetchedFields = await fieldsRef.get();

    fetchedFields.forEach((doc) => {
      let field = doc.data();

      if (field.isEditableBitrix == true || field.isEditableValue == true) { // Используйте isEditableBitrix, а не isЕditableBitrix
        fields.push(field);
      }


    })
    logger.info('fields')
    logger.info(fields)


    let products = []
    // const productsRef = db.collection('products');
    // const fetchedproducts = await productsRef.get();

    // fetchedproducts.forEach((doc) => {
    //   let product = doc.data()
    //   // logger.info(product);
    //   products.push(product)


    // })




    let searchingCounter = 0
    const countersRef = db.collection('counters').doc('clients');
    const fetchedCounters = await countersRef.get();
    logger.info('fetchedCounters.exists')
    logger.info(fetchedCounters.exists)
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

    let consalting = []
    const consaltingRef = db.collection('consalting');
    const consaltingFields = await consaltingRef.get();

    consaltingFields.forEach((doc) => {
      let c = doc.data()
      consalting.push({
        consaltingNumber: c.number,
        bitrixId: null
      })


    })
    let legalTech = []
    const legalTechRef = db.collection('legalTech');
    const legalTechFields = await legalTechRef.get();

    legalTechFields.forEach((doc) => {
      let lt = doc.data()
      if (lt.type === 'package') {
        legalTech.push({
          legalTechNumber: lt.number,
          bitrixId: null
        })
      }
    })


    let contracts = {
      items: [],
      current: [0, 1, 2, 3],
      bitrixId: null
    }
    const contractsRef = db.collection('contracts');
    const contractsFields = await contractsRef.get();

    contractsFields.forEach((doc) => {
      let contract = doc.data()

      contracts.items.push({ ...contract })

    })



    if (clientsCount === 0) {

      const writeResult = await db
        .collection("clients")
        .add({ ...data, number: searchingCounter, fields, regions: [30], products, consalting, legalTech, contracts, });

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



    }
    else {
      res.json({ result: { resultCode: 1, message: 'Client is allready exist!' } });
    }
    // res.json({ result: { resultCode: 0, client: fields } });
  });

// exports.modifyfield = onDocumentWritten("fields/{fieldsNumber}", (event) => {
//   // Get an object with the current document values.
//   // If the document does not exist, it was deleted
//   const document = event.data.after.data();

//   // Get an object with the previous document values
//   const previousValues = event.data.before.data();

//   // perform more operations ...
// });


exports.getApril = onRequest(
  { cors: true },
  async (req, res) => {
    //req
    //domain

    const db = getFirestore();
    // Grab the text parameter.
    const clientData = req.body;
    let data = clientData.data






    // let products = []
    // const productsRef = db.collection('products');
    // const fetchedproducts = await productsRef.get();

    // fetchedproducts.forEach((doc) => {
    //   let product = doc.data()
    //   logger.info(product);
    //   products.push(product)


    // })








    let fields = []
    let client = null
    let clientRegions = []
    let supplies = []
    let clientRegionsIds = [30]
    let regionsNames = []
    let clientId = undefined
    const clientsRef = db.collection('clients');  //берем снимок коллекции клиентов
    const clientsFetched = await clientsRef.get(); //берем

    clientsFetched.forEach((doc) => {  //перебираем
      let docClient = doc.data()


      if (docClient.domain === data) {
        client = docClient
        clientRegionsIds = client.regions
        if (client.fields) {
          // fields =
          client.fields.forEach(f => {
            logger.log(f.action)
            f.action && fields.push(f)
          })
        }

        clientId = client.id

      }

    })

    if (!clientRegionsIds || (clientRegionsIds && clientRegionsIds.length < 1)) {
      clientRegionsIds = [30]
      // const writeResult = await db
      //   .collection("clients", client)
      //   .add({ regions: [30] });

    }


    const fieldsRef = db.collection('fields');  //берем снимок коллекции клиентов
    const fieldsFetched = await fieldsRef.get(); //берем

    fieldsFetched.forEach((doc) => {  //перебираем
      let field = doc.data()
      if (field.isEditableBitrix == false && field.isEditableValue == false && field.type !== 'reserv') { // Используйте isEditableBitrix, а не isЕditableBitrix
        fields.push(field);
      }


    })



    let bitrix = {}
    fields.forEach(field => {
      bitrix[field.type] = { ...bitrix[field.type] }
      bitrix[field.type][field.name] = field
    })


    const suppliesRef = db.collection('supplies');  //берем снимок коллекции клиентов
    const suppliesFetched = await suppliesRef.get(); //берем

    suppliesFetched.forEach((doc) => {  //перебираем
      supply = doc.data()
      supplies.push(supply)


    })



    // let products = {}
    // const productsRef = db.collection('products');
    // const productsFetched = await productsRef.get();



    // productsFetched.forEach((doc) => {
    //     let product = doc.data()
    //     products[product.complectType] = { ...products[product.complectType] }
    //     if (product.supplyType) { //если есть тип поставки - то есть Lt либо консалтинг
    //         products[product.complectType][product.supplyType] = { ...products[product.complectType][product.supplyType] }

    //         // products[product.complectType][product.supplyType][product.contractName] = [...products[product.complectType][product.supplyType][product.contractName]]
    //         if (Array.isArray(products[product.complectType][product.supplyType][product.contractNumber])) {
    //             products[product.complectType][product.supplyType][product.contractNumber].push(product)
    //         } else {
    //             products[product.complectType][product.supplyType][product.contractNumber] = [product]
    //         }
    //     } else {
    //         if (Array.isArray(products[product.complectType][product.contractName])) {
    //             products[product.complectType][product.contractNumber].push(product)
    //         } else {
    //             products[product.complectType][product.contractNumber] = [product]
    //         }
    //     }


    // })




    // let regionNames = []
    // const regionsRef = db.collection('regions');
    // const regionsFetched = await regionsRef.get();


    // logger.info('regionsFetched.length')

    // logger.info(regionsFetched.length)


    // regionsFetched.forEach(region => {
    //     if (region) {
    //         clientRegions.push(region)
    //         if (region.name) {
    //             regionNames.push(region.name)
    //         }
    //     }


    // });







    let profs = []
    let universals = []
    let regions = []
    const profRef = db.collection('prof');
    const profFetched = await profRef.get(); //берем

    profFetched.forEach((doc) => {  //перебираем
      let prof = doc.data()
      profs.push(prof)


    })

    const regionsRef = db.collection('regions');
    const regionsFetched = await regionsRef.get(); //берем

    regionsFetched.forEach((doc) => {  //перебираем
      let region = doc.data()
      if (clientRegionsIds.includes(region.number)) {
        regions.push(region)
        regionsNames.push(region.name)
      }

    })

    const universalRef = db.collection('universal');
    const universalFetched = await universalRef.get(); //берем

    universalFetched.forEach((doc) => {  //перебираем
      let universal = doc.data()
      if (regionsNames.includes(universal.region)) {
        universals.push(universal)
      }
    })

    let contracts = []
    const contractsRef = db.collection('contracts');
    const contractsFetched = await contractsRef.get(); //берем

    contractsFetched.forEach((doc) => {  //перебираем
      let contract = doc.data()
      contracts.push(contract)
    })

    /////////////////////////////////////////////////LEGAL///TECH
    let lt = {
      lt: [],
      packages: []
    }
    const ltRef = db.collection('legalTech');
    const ltFetched = await ltRef.get(); //берем

    ltFetched.forEach((doc) => {  //перебираем
      let ltdoc = doc.data()
      if (ltdoc.type === 'package') {
        lt.packages.push(ltdoc)
      } else {
        lt[ltdoc.type].push(ltdoc)
      }

    })


    /////////////////////////////////////////////////CONSALTING
    let consalting = []
    const consaltingRef = db.collection('consalting');
    const consaltingFetched = await consaltingRef.get(); //берем

    consaltingFetched.forEach((doc) => {  //перебираем
      let consaltingdoc = doc.data()

      consalting.push(consaltingdoc)
    })

    /////////////////////////////////////////////////COMPLECTS
    let complects = []
    const complectsRef = db.collection('complects');
    const complectsFetched = await complectsRef.get(); //берем

    complectsFetched.forEach((doc) => {  //перебираем
      let complect = doc.data()

      complects.push(complect)
    })

    res.json({
      result: {
        resultCode: 0,
        data: {
          contracts,
          complects,
          supplies,
          bitrix,
          regions,
          prices: {
            prof: profs,
            universal: universals,
          },
          legalTech: lt,
          consalting
        }
      }
    });

  });


exports.getVersion = onRequest(
  { cors: true },
  async (req, res) => {
    //req
    //domain

    const db = getFirestore();
    // Grab the text parameter.
    // const clientData = req.body;
    // let data = clientData.data

    const versionsRef = db.collection('versions');  //берем снимок коллекции клиентов
    const versionsFetched = await versionsRef.get(); //берем
    let version = null
    versionsFetched.forEach((doc) => {  //перебираем
      let v = doc.data()
      if (v.name === 'app') {
        version = v.value
      }



    })
    res.json({
      result: {
        resultCode: 0,
        data: {
          version
        },
      }
    });
  });