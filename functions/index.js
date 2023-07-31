/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");

const logger = require("firebase-functions/logger");

const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { Configuration, OpenAIApi } = require("openai");

// const axios = require('axios');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

initializeApp();
const db = getFirestore();
// const api = axios.create({
//   withCredentials: true,
//   baseURL: 'https://april-server.ru/api',


//   headers: {
//     'content-type': 'application/json',
//     'accept': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//   },

// })
// api.defaults.redirect = "follow";



// ai.defaults.redirect = "follow";

exports.ai = onRequest(
  { cors: true },
  async (req, res) => {
    logger.info('openai')
    const contentData = req.body;
    const content = contentData.data
    logger.info('content')
    logger.info(content)
    // const ai = axios.create({

    //   baseURL: 'https://api.openai.com/v1/chat/',
    //   withCredentials: true,

    //   headers: {
    //     'content-type': 'application/json',
    //     'accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     "Authorization":"Bearer  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",
    //     "OpenAI-Organization": "org-Fcz2Q5m4LbPQxeV17S2mVOTx"
    //     },

    // })
    // const openai = await ai.post('/completions', {
    //   "model": "gpt-3.5-turbo",
    //   "messages": [{"role": "user", "content": "Say this is a test!"}],
    //   "temperature": 0.7
    // })

    const configuration = new Configuration({
      organization: "org-Fcz2Q5m4LbPQxeV17S2mVOTx",
      apiKey: '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',

    });
    const openai = new OpenAIApi(configuration);

    try {
      // const response = await openai.listModels()


      // const response = await openai.createChatCompletion({
      //   model: "text-davinci-003",
      //   "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}],
      //   prompt: "Say this is a test",
      //   max_tokens: 7,
      //   temperature: 0.2,
      //   // max_tokens: 1024,
      // });


      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: content }],
        //   prompt: "Say this is a test",
        //   max_tokens: 7,
        //   temperature: 0.2,
      });
      logger.info('response')
      logger.info(response)

      logger.info(response.data.choices[0].message);
      res.json({
        result: {
          resultCode: 0,
          data: response.data.choices[0].message
        }
      });
    } catch (error) {
      res.json({
        result: {
          resultCode: 1,
          data: {
            'error': { ...error }
          },
        }
      });
    }

    //   const response = await openai.createChatCompletion({
    //     model: "gpt-4",
    //     messages: [
    //       {
    //         "role": "user",
    //         "content": "Draft a company memo to be distributed to all employees. The memo should cover the following specific points without deviating from the topics mentioned and not writing any fact which is not present here:\n\nIntroduction: Remind employees about the upcoming quarterly review scheduled for the last week of April.\n\nPerformance Metrics: Clearly state the three key performance indicators (KPIs) that will be assessed during the review: sales targets, customer satisfaction (measured by net promoter score), and process efficiency (measured by average project completion time).\n\nProject Updates: Provide a brief update on the status of the three ongoing company projects:\n\na. Project Alpha: 75% complete, expected completion by May 30th.\nb. Project Beta: 50% complete, expected completion by June 15th.\nc. Project Gamma: 30% complete, expected completion by July 31st.\n\nTeam Recognition: Announce that the Sales Team was the top-performing team of the past quarter and congratulate them for achieving 120% of their target.\n\nTraining Opportunities: Inform employees about the upcoming training workshops that will be held in May, including \"Advanced Customer Service\" on May 10th and \"Project Management Essentials\" on May 25th."
    //       }
    //     ],
    //     temperature: 0,
    //     max_tokens: 1024,
    //   });

  });


exports.helloWorld = onRequest({ cors: true }, (request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});


exports.setNewClient = onRequest(
  { cors: true },
  async (req, res) => {
    //name, email, domain, placementKey, hookKey
    logger.info('client function')
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
      current: [0, 1, 2, 3, 4, 5, 6, 7],

    }
    const contractsRef = db.collection('contracts');
    const contractsFields = await contractsRef.get();

    contractsFields.forEach((doc) => {
      let contract = doc.data()

      contracts.items.push({ ...contract })

    })

    let apiResponse = 'Clients is not found'



    let defaultRegion = null
    const regionsRef = db.collection('regions');
    const regionsFields = await regionsRef.get();

    regionsFields.forEach((doc) => {
      let region = doc.data()
      if (region.name == 'msk') {
        defaultRegion = {
          number: region.number,
          regionNumber: region.number,
          isOwnAbs: false,
          abs: region.abs,
          ownAbs: null

        }
      }


    })



    if (clientsCount === 0) {

      const writeResult = await db
        .collection("clients")
        .add({ ...data, number: searchingCounter, fields, regions: [defaultRegion], consalting, legalTech, contracts });

      let clientSnapshot = await writeResult.get();
      let client = clientSnapshot.data();

      // try {
      //   apiResponse = await api.post("/client", {
      //     domain: data.domain, key: data.key, hook: data.hook
      //   });

      //   logger.log('apiResponse.data');
      //   logger.log(apiResponse.data);
      //   if (apiResponse.data) {
      //     apiResponse = apiResponse.data
      //   }
      // } catch (error) {
      //   logger.error('Error making POST request:', error);

      // }

      res.json({ result: { resultCode: 0, client, server: 'не используем' } });



    }
    else {
      apiResponse = 'Client is allready exist!'
      res.json({ result: { resultCode: 1, message: apiResponse } });
    }
    // res.json({ result: { resultCode: 0, client: fields } });
  });




exports.getApril = onRequest(
  { cors: true },
  async (req, res) => {
    //req
    //domain

    const db = getFirestore();
    // Grab the text parameter.
    const clientData = req.body;
    let data = clientData.data


    let fields = []
    let contracts = {}
    let client = null
    let clientRegions = []
    let supplies = []
    // let clientRegions = [30]
    let regionsNames = []
    let clientId = undefined
    let profs = []
    let universals = []
    let regions = []


    const clientsRef = db.collection('clients');  //берем снимок коллекции клиентов
    const clientsFetched = await clientsRef.get(); //берем

    clientsFetched.forEach((doc) => {  //перебираем
      let docClient = doc.data()


      if (docClient.domain === data) {
        client = docClient
        clientRegions = client.regions
        if (client.fields) {
          // fields =
          client.fields.forEach(f => {
            logger.log(f.action)
            f.action && fields.push(f)
          })
        }

        contracts = client.contracts


        clientId = client.id

      }

    })



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
      let clientRegion = clientRegions.find(cr => cr.regionNumber === region.number)
      let resultRegion
      if (clientRegion) {
        //Если у клиента кастомный абс
        if (clientRegion.isOwnAbs && clientRegion.ownAbs) {
          //меняет значение абс на абс-собственный
          resultRegion = {
            ...region,
            abs: clientRegion.ownAbs
          }
        } else {
          resultRegion = region
        }
        regions.push(resultRegion)
        regionsNames.push(resultRegion.name)
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
          domain: client.domain,
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



exports.generateClientFields = onRequest({ cors: true },
  async (request, response) => {
    const db = getFirestore();
    const clientsRef = db.collection('clients');
    const fetchedClients = await clientsRef.get();



    const fieldsRef = db.collection('fields');
    const fetchedFields = await fieldsRef.get();

    fetchedClients.forEach((doc) => {
      let clientFields = []
      const client = doc.data()

      fetchedFields.forEach((doc) => {
        let field = doc.data();
        let isEditable = field.isEditableBitrix == true || field.isEditableValue == true
        let tempClientField = client.fields.find(f => f.number === field.number)

        let customBirixId = tempClientField ? tempClientField.bitrixId : field.bitrixId
        let customValue = tempClientField ? tempClientField.value : field.value
        let number = Number(`${client.number}.${field.number}`)

        if (isEditable) {
          clientFields.push({
            number,
            fieldNumber: field.number,
            clientNumber: client.number,
            properties: {
              bitrixId: customBirixId,
              value: customValue
            },
            currentCustomProperties: [
              'bitrixId', 'value'
            ]


          });
        }

        // await db
        // .collection('clientFields')
        // .doc('clients')
        // .set({ value: searchingCounter });

      })

    })




    logger.info(clientFields, { structuredData: true });
    response.send(clientFields);
  });


exports.fieldsUpdateInClients = onDocumentUpdated("fields/{fieldId}", (event) => {
  //   // Get an object with the current document values.
  //   // If the document does not exist, it was deleted
  const document = event.data.after.data();
  const previousValues = event.data.before.data();
  //   let clients = []


  // const clientsRef = db.collection('clients');
  const fetchedClient = db.doc('clients').get();

  fetchedClient.forEach((doc) => {
    let client = doc.data();
    let count = 0
    client.fields.forEach(f => {
      let newClientFields = []
      let bitrixId = f.bitrixId
      let value = f.value

      if (f.number === document.number) {
        count++
        if (f.isEditableBitrix === false) {
          bitrixId = document.bitrixId
        }

        if (f.isEditableValue === false) {
          value = document.value
        }

        newClientFields.push({
          ...document,
          bitrixId,
          value


        })
      }
    })
    if (count === 0) {
      newClientFields.push(document)
    }
    client.fields = newClientFields

    // db.doc(`clients/${client.id}`).set(client);


    logger.info(client)
    logger.info('newClientFields')
    logger.info(newClientFields)

  })
  //   // Get an object with the previous document values


  //   // perform more operations ...
});