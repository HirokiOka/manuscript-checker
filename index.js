const pdf = require('pdf-parse');
const fs = require('fs');

const dataBuffer = fs.readFileSync('sensors_oka_v2_en.pdf');
const sectionKeywords = ['Abstract', 'Introduction', 'Related Works'];
const ignoreKeywords = ['Version April 3'];

pdf(dataBuffer).then((data) => {
  const text = data.text;
  const splittedText = text.split('\n');

  const numExp = /\d/g;
  let printFlag = false;
  for (let line of splittedText) {
    if (line.includes(ignoreKeywords[0])) {
      continue;
    }

    if (line.includes(sectionKeywords[1])) {
      printFlag = true;
    }


    if (line.match(numExp)) {
      const digitCaptureGroup = [...line.matchAll(numExp)];
      const digitIndices = digitCaptureGroup.map(cg => cg.index);
      const ignoreIndices = [line.length -1,line.length - 2, line.length - 3];
      const digitIgnoreIndices = digitIndices.filter(di => ignoreIndices.includes(di));
      
      for (const digitIndex of digitIndices) {
        if (ignoreIndices.includes(digitIndex)) {
          line = line.substring(0, digitIndex);
        }
      }
      digitIndices.forEach((digitIndex, i) => {
        if (ignoreIndices.includes(digitIndex)) {
          line = line.substring(0, digitIndex+i);
        }
      });
    }  

    if (line.includes(sectionKeywords[2])) {
      printFlag = false;
    }

    if (printFlag) console.log(line);

  }

    //console.log(splittedText);
  //fs.writeFileSync('./pdf.txt', text);
}).catch((err) => {
  console.log(err);
});

