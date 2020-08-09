# About our GEOCODE Usage

Hi, this README outlines the [the need for](#the-need) and [source](#source) of our Geocodes, explains how we [processed](#csv-processing) related CSV files and the [structure](#json-structure) of our JSON files used in our keystone SalaryCloud Application.

## The Need
We needed a standardized method of mapping US States to Counties. It would also be a plus if this mapping could meld well with Census Data and Map Displays in the future.

A whole new API might be overkill at this point in the project. Using FIPs (Federal Information Processing Standards) Codes would work for now. Basically, **we needed to construct JSON mappings of FIPs Codes to State Names, and State FIPs Codes to County FIPs Codes mapped to County names.**

## Source
We extracted our state and county FIPs codes and names from two documents provided by the United States Census Bureau. You can find the raw CSV Files [here](https://www2.census.gov/programs-surveys/popest/geographies/2018/).

Files titles as of 07/12/2020 and what we extracted
- state_geocodes-v2018.xlsx &#8594; State Code, State Name
- all-geocodes-v2018.xlsx &#8594; State Code, County Code, County Name

## CSV Processing
`state_geocodes-v2018.xlsx` was not immediately structured for parsing. converting it to CSV format produced a single line string when read. Note, the entries like "Islamorada, Village of Islands village" was changed to "Islamorada/Village of Islands village" to make parsing easier on our end.


## JSON Structure
`state_codes_to_names.json` maps States FIPs codes to State Names in ascending order starting from 01 to 56. Interestingly, States are also in alphabetical order.
```javascript
{
  "State FIPs Code": "State Name",
  "01": "Alabama",
  ⋮
  "56": "Wyoming"
}
```

`state_codes_to_counties.json` maps State FIPs codes to FIPs County Code mapped to a County Name or an array of County Names.
```javascript
{
  "State Code": {
    "County Code": "County Name",
    ⋮
    "001": "Autauga County",
    ⋮
    "005": ["County Name", "Sub County"]
  }
}
```
