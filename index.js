const pdf = require('pdf-parse');
const fs = require('fs');

const dataBuffer = fs.readFileSync('sensors_oka_v2_en.pdf');
const sectionKeywords = [
  'Abstract', 'Introduction', 'Related Works', 'Proposed Method',
  'Stumble Notification Application', 'Discussion', 'Conclusion',
];
const ignoreKeywords = ['Version April 3'];

pdf(dataBuffer).then((data) => {
  const text = data.text;
  const splittedText = text.split('\n');

  const numExp = /\d/g;
  let textArray = [];
  let writeFlag = false;

  for (let line of splittedText) {
    if (line.includes(ignoreKeywords[0])) {
      continue;
    }

    if (line.includes(sectionKeywords[1])) {
      writeFlag = true;
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

      //Remove digits
      digitIndices.forEach((digitIndex, i) => {
        if (ignoreIndices.includes(digitIndex)) {
          line = line.substring(0, digitIndex+i);
        }
      });
    }  

    if (line.includes(sectionKeywords[6])) {
      writeFlag = false;
    }

    //if (writeFlag) console.log(line);
    if (writeFlag) {
      const inputText = line + '\n';
      textArray.push(inputText);
    }
  }
  console.log(textArray);

  fs.writeFileSync('./pdf.txt', textArray.join(''));
}).catch((err) => {
  console.log(err);
});

