export const converToMap = (transFormedCollection: any, key: string) =>
  transFormedCollection.reduce((accumulator: any, collection: any) => {
    accumulator[key.toLowerCase()] = collection;
    return accumulator;
  }, {});
