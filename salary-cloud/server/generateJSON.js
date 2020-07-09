const fs = require('fs');

const NEW_FILE = 'state_codes_to_names.json';
const CSV_FILE = 'state-geocodes-v2018.csv';
const KEY_COL = 2;
const VAL_COL = 3;
const SHOULD_SORT = false;
let json = {};

function generateJSON() {
  fs.exists(NEW_FILE, (exists) => {
    fs.readFile(CSV_FILE, 'utf-8', (error, csvString) => {
      if (error) {
        console.log(error);
        return;
      }
      // \r is similar to the new line character \n, but we don't need it
      csvString = csvString.replace(/\r/g, '');
      let lines = csvString.split('\n');
      lines.forEach((line, i) => {
        if (line.length < 1) {
          return;
        }
        let cols = line.split(',');
        console.log(cols);
        let key = cols[KEY_COL];
        let val = cols[VAL_COL];

        if (!json[key]) {
          json[key] = val;
        } else {
          if (Array.isArray(json[key])) {
            json[key].push(val);
          } else {
            json[key] = [val];
          }
        }
      });

      if (SHOULD_SORT) {
        // TODO: sort file
      } else {
        fs.writeFile(NEW_FILE, JSON.stringify(json), (error, result) => {
          if (error) {
            console.log(error);
            return;
          }
        });
      }
    });
  });
}

generateJSON();
