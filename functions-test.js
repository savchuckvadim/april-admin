
  const testProducts = async () => {

    // let products = []
    // const productsRef = db.collection('products');


    // fetchedproducts.forEach((doc) => {
    //   let product = doc.data()
    //   logger.info(product);
    //   products.push(product)


    // })

    // const fetchedproducts = await productsRef.get();

    // const productPromises = fetchedproducts.docs.map(async doc => {
    //   let product = doc.data();
    //   logger.info(product);
    //   return product;
    // });

    // products = await Promise.all(productPromises);
    function chunkArray(array, chunkSize) {
      let index = 0;
      let arrayLength = array.length;
      let tempArray = [];

      for (index = 0; index < arrayLength; index += chunkSize) {
        let chunk = array.slice(index, index + chunkSize);
        tempArray.push(chunk);
      }

      return tempArray;
    }





      const productsSnapshot = await db.collection('products').get();
      const products = productsSnapshot.docs.map(doc => doc.data());

      // Разбиваем продукты на группы по 500
      const productChunks = chunkArray(products, 500);

      // Для каждой группы продуктов...
      for (let i = 0; i < productChunks.length; i++) {
        // Создаем новую коллекцию "ClientProducts" и добавляем в нее продукты с clientId
        const batch = db.batch();
        productChunks[i].forEach((product) => {
          const docRef = db.collection('ClientProducts').doc(); // автоматическое создание ID документа
          batch.set(docRef, { clientNumber, ...product }); // добавляем в каждый продукт clientId
        });
        await batch.commit(); // записываем все продукты за один раз
      }


  }