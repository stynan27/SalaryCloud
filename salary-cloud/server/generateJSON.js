const fs = require('fs');

const state_codes_to_names_json = 'state_codes_to_names.json';
const county_names_to_codes_json = 'county_names_to_codes.json';
const county_codes_to_names_json = 'county_codes_to_names.json';

const state_geocodes_csv = 'state-geocodes-v2018.csv';
const county_geocodes_csv = 'all-geocodes-v2018.csv';
const SHOULD_SORT = false;

function state_codes_to_names(json, col_array) {
  const CODE_COL = 3;
  const NAME_COL = 2;
  let key = col_array[CODE_COL];
  let val = col_array[NAME_COL];
  json[key] = val;
}

function state_names_to_codes(json, col_array) {
  const NAME_COL = 3;
  const CODE_COL = 2;
  let key = col_array[NAME_COL];
  let val = col_array[CODE_COL];
  json[key] = val;
}

function state_codes_to_counties(json, col_array) {
  const STATE_COL = 1;
  const COUNTY_COL = 2;
  const NAME_COL = 6;
  let stateCode = col_array[STATE_COL];
  let countyCode = col_array[COUNTY_COL];
  let countyName = col_array[NAME_COL];
  if (!json[stateCode]) {
    json[stateCode] = {[countyCode]: countyName};
  } else if (json[stateCode][countyCode]) {
    if (!Array.isArray(json[stateCode][countyCode])) {
      json[stateCode][countyCode] = [json[stateCode][countyCode]];
    }
    json[stateCode][countyCode].push(countyName)
  } else {
    json[stateCode][countyCode] = countyName;
  }
}

function generateJSON(csvFileName, newFileName, generatorFunc) {
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
      var json = {};
      lines.forEach((line, i) => {
        if (line.length < 1) {
          return;
        }
        let cols = line.split(',');
        generatorFunc(json, cols);
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

        // We have a county name that includes a comma...
        // Will need to merge cells based on the start and end quotes
        if (target.charAt(0) == '"') {
          console.log(`Double Quote found for ${target}`);
          var j = i + 1;
          let found = false;
          while (j < cells.length && !found) {
            let cell = cells[j];
            console.log(`Examining Cell ${cell}`);
            cell = cell.replace(/\r/g, '');
            if (cell.search('\"') === -1) {
              j++;
            } else {
              console.log(`End Quote for ${target} found in ${cell}`);
              found = true;
              // j+1 b/c end param is exclusive
              var targetCells = cells.slice(i, j+1);
              const squash = (accumulator, currentVal) => {
                return accumulator + currentVal;
              };

              let out = targetCells.reduce(squash);
              cells[i] = out;
              // Remove the values we just merged
              cells.splice(i+1, j-i);
              target = cells[i];
            }
          }
          if (!found) {
            console.log(`Encountered entry missing ending ", ${target}, proceeding anyway...`);
          }
        }

        let splitAt = target.search(/[0-9]/);


        if (splitAt == -1) {
          console.log(`No adjacent digits found, nothing to split at ${target}`);
          // Nothing to split here...
          // Just insert the new line after the next comma
          cells.splice(i+1, 0, "\n");
        } else {
          let countyName = target.slice(0, splitAt);
          let newCode = target.slice(splitAt);
          // Replace current index with countyName
          cells[i] = countyName;
          // Insert adjacent fips code in next index
          // Also prepend a \n for readability
          cells.splice(i+1, 0, "\n" + newCode);
        }
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

cleanUp(county_geocodes_csv, 'county_codes_to_names.csv');
generateJSON('county_codes_to_names.csv', county_codes_to_names_json, state_codes_to_counties)
