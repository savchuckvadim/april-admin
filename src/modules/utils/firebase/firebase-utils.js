export const  makeChunks = (array, chunkSize) => {
     
    let index = 0;
    let arrayLength = array.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      let chunk = array.slice(index, index + chunkSize);
      tempArray.push(chunk);
    }

    return tempArray;
  };