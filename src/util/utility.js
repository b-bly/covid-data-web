export const csvToJSON = (csv) => {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    const obj = {};
    const currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  //return result; //JavaScript object
  return result;
}

export const swapKeysAndValues = (json) => {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

export const getAbbreviation = (str) => {
  return str.match(/\b[a-zA-Z]/g).map(letter => letter.toUpperCase()).join('');
}