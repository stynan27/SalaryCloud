const fs = require('fs');

const NEW_FILE = 'state_codes_to_names.json';
const CSV_FILE = 'state-geocodes-v2018.csv';
const KEY_COL = 2;
const VAL_COL = 3;
const SHOULD_SORT = false;
var json = {};

function generateJSON(csvFileName, newFileName) {
  fs.exists(csvFileName, (exists) => {
    if (!exists) {
      console.log(`CSV File titled ${csvFileName} does not exist, cannot be read.`);
      return;
    }
    fs.readFile(csvFileName, 'utf-8', (error, csvString) => {
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
        fs.writeFile(newFileName, JSON.stringify(json), (error, result) => {
          if (error) {
            console.log(error);
            return;
          }
        });
      }
    });
  });
}

const SPLIT_STEP = 6;

/*
  Creates a copy of a given CSV File where a given column is split on the first instance of a digit and a new line character is inserted at the beginning of the new column. This function assumes that the csv rows are not separated and will insert the new line character where the last alphabetical character is adjacent to the first digit every SPLIT_STEP columns.
*/
function cleanUp(csvFileName, newFileName) {
  if (!newFileName.match(/\.csv$/)) {
    newFileName += '.csv';
  }

  fs.exists(csvFileName, (exists) => {
    if (!exists) {
      console.log(`CSV File titled ${csvFileName} not found, cannot be read.`);
      return;
    }

    fs.readFile(csvFileName, 'utf-8', (error, csvString) => {
      if (error) {
        console.log(error);
        return;
      }

      var cells = csvString.split(',');
      var i = SPLIT_STEP;
      while (i < cells.length) {
        // Extract countyName and adjacent code
        let target = cells[i];
        target = target.replace(/\r/g, '');
        let splitAt = target.search(/[0-9]/);
        let countyName = target.slice(0, splitAt);
        let newCode = target.slice(splitAt);
        // Replace current index with countyName
        cells[i] = countyName;
        // Insert adjacent code in next index
        // Also prepend a \n for readability
        cells.splice(i+1, 0, "\n" + newCode);
        i += SPLIT_STEP + 1;
      }

      fs.writeFile(newFileName, cells.toString(), (error, result) => {
        if (error) {
          console.log(error);
          return;
        }
      });

    });


  });
}

cleanUp('all-geocodes-v2018.csv', 'county_codes_to_names.csv');
