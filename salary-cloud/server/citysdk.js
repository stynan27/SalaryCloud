const census = require('citysdk');
const fs = require('fs');
const API_KEY = "57abfc64813428ef60094a8f010d67b1cd152b02";


const outString = fs.readFileSync('./county_codes_to_names.json','utf8');
const code_to_name = JSON.parse(outString);


let data = census({
  sourcePath: ["pep", "housing"],
  vintage: '2019',
  values: ["HUEST", "DATE_DESC", "COUNTY"],
  geoHierarchy: {
    state: "36",
    county: "*"
  },
  key: API_KEY
}, (error, response) => {
  if (error) {
    console.log(error);
    return;
  }
  const target = matchByCountyNumber(63, response);
  console.log(target);
});


function matchByCountyNumber(fipsNum, json) {
  let target =  fipsNum + '';
  // County values in response have leading 0 if int < 100
  // Need to pad our target in that case
  if (fipsNum < 100) {
    target = '0' + target;
  }
  for (var i = 0; i < json.length; i++) {
    if (target.localeCompare(json[i].county) === 0) {
      return json[i];
    }
  }
  return {};
}

function getCountyNameByNum(fipsNum) {
  return code_to_name[fipsNum + ''] ? code_to_name[fipsNum + ''] : {};
}
