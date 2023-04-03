const pdf = require('pdf-parse');
const fs = require('fs');

let dataBuffer = fs.readFileSync('sensors_oka_v2_en.pdf');
/*
const options = {
  encoding: 'binary',
  pagerender: function(pageData) {
    const {TextDecoder} = require('util');
    const decoder = new TextDecoder('UTF-8');
    const text = decoder.decode(pageData.text);
    return Promise.resolve(text);
  }
};
*/

pdf(dataBuffer).then((data) => {
  const text = data.text;
  fs.writeFileSync('./pdf.txt', text);
}).catch((err) => {
  console.log(err);
});

