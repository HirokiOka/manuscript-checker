const pdf = require('pdf-parse');
const fs = require('fs');

const dataBuffer = fs.readFileSync('sensors_oka_v2_en.pdf');
const keywords = ['Abstract', 'Introduction', 'Related Works'];

pdf(dataBuffer).then((data) => {
  const text = data.text;
  const splittedText = text.split('\n');

  const numExp = /\d/;
  for (const line of splittedText) {
    if (line.includes(keywords[0])) {
      console.log(line);
    }
  }
    //console.log(splittedText);
  //fs.writeFileSync('./pdf.txt', text);
}).catch((err) => {
  console.log(err);
});

