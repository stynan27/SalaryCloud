const census = require('citysdk');
const fs = require('fs');
const API_KEY = "57abfc64813428ef60094a8f010d67b1cd152b02";

// https://api.census.gov/data/2018/acs/acs1/profile/variables.html

const outString = fs.readFileSync('./county_codes_to_names.json','utf8');
const code_to_name = JSON.parse(outString);

// HUEST (House Unit Estimates)
const huest = {
  sourcePath: ["pep", "housing"],
  vintage: '2019',
  values: ["HUEST", "DATE_DESC", "COUNTY"],
  geoHierarchy: {
    state: "36",
    county: "*"
  },
  key: API_KEY
};

// Selected Housing Unit Characteristics
// https://data.census.gov/cedsci/table?q=rent&hidePreview=false&tid=ACSDP1Y2018.DP04&vintage=2018

// DP04_0126E seems to be the total number of people surveyed.
// it might be better to instead use the median rent for a given county
// Median: DP04_0134E
const huc = {
  sourcePath: ["acs", "acs1", "profile"],
  vintage: '2018',
  values: ["NAME", "DP04_0134E"],
  geoHierarchy: {
    state: "36",
    county: "*"
  },
  key: API_KEY
}

let data = census(huc, (error, response) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(response);
  const target = matchByCountyNumber(01, response);
  console.log(target);
});


function matchByCountyNumber(fipsNum, json) {
  let target =  fipsNum + '';
  // County values in response have leading 0 if int < 100
  // Need to pad our target in that case
  if (fipsNum < 100) {
    target = '0' + target;
  }
  if (fipsNum < 10) {
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
