export default function (queryString) {
  // Remove the leading '?'
  const paramsString = queryString.slice(1);

  // Split into key-value pairs
  const keyValuePairs = paramsString.split('&');

  // Create an object from the key-value pairs
  const searchParamsObject = {};
  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split('=');
    searchParamsObject[key] = value;
  });


  searchParamsObject.limit = 20
  return searchParamsObject;
}
