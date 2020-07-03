import _ from 'lodash';
import { swapKeysAndValues, csvToJSON, getAbbreviation } from '../util/utility';
import stateAbbreviations from '../assets/stateAbbreviations.json';
import { getCsvAsJSONFromGithub } from './dataService';
import { monthNames } from '../util/constants';

const abbreviationsSwapped = swapKeysAndValues(stateAbbreviations);
const nyTimesStateUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv';

const getMostRecentRecordForEachState = (data) => {
  let stateDictionary = _.groupBy(data, 'state');

  // get most recent record for each state
  let arr = [];
  for (const key in stateDictionary) {
    stateDictionary[key] = _.orderBy(stateDictionary[key], [(o) => o.date], ['desc'])
      .reduce((acc, o, i) => (i === 0 ? o : acc));
    arr.push(stateDictionary[key]);
  }
  return arr.map(record => {
    if (!abbreviationsSwapped[record.state]) {
      record.state = getAbbreviation(record.state);
    }
    record.state = abbreviationsSwapped[record.state];
    return record;
  });
}

export const getDeathsByState = (data) => {
  // {"date":"2020-06-23","county":"Montgomery","state":"Texas","fips":"48339","cases":"1737","deaths":"34"}
  let arr = getMostRecentRecordForEachState(data);
  arr = _.sortBy(arr, [o => parseInt(o.deaths)], ['asc']).reverse();
  return {
    labels: arr.map(o => o.state),
    datasets: [{ data: arr.map(o => o.deaths) }]
  };
}
// Bar graph data format example

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       data: [20, 45, 28, 80, 99, 43]
//     }
//   ]
// };

export const getCasesByState = (data) => {
  let arr = getMostRecentRecordForEachState(data);
  arr = _.sortBy(arr, [o => parseInt(o.cases)], ['asc']).reverse(); // .slice(0, 8)

  const result = {
    labels: arr.map(o => o.state),
    datasets: [{ data: arr.map(o => o.cases) }]
  };
  return result;
}

export const getDeathsByDateForState = (data, state) => {
  let stateDictionary = _.groupBy(data, 'state');
  if (!state) {
    state = 'Alabama';
  }
  let stateData = _.orderBy(stateDictionary[state], ['date'], ['asc']);
  let groupedByMonth = _.groupBy(stateData, (item) => item.date.substring(0, 7));
  let months = [];
  let deaths = [];
  for (const month in groupedByMonth) {
    const monthNum = parseInt(month.substring(5, 7));
    const monthText = monthNames[monthNum - 1];
    months.push(monthText);
    const highestDeath = _.maxBy(groupedByMonth[month], o => parseInt(o.deaths));
    deaths.push(parseInt(highestDeath.deaths));
  }
  if (months.length > 5) {
    months = months.slice(0, 5);
    deaths = deaths.slice(0, 5);
  }

  const lineGraphData = {
    labels: months,
    datasets: [
      {
        data: deaths,
        // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        // strokeWidth: 2 // optional
      }
    ],
    // legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
  };
  return lineGraphData;
}


export const getCasesByDateForState = (data, state) => {
  let stateDictionary = _.groupBy(data, 'state');
  if (!state) {
    state = 'Alabama';
  }
  let stateData = _.orderBy(stateDictionary[state], ['date'], ['asc']);
  let groupedByMonth = _.groupBy(stateData, (item) => item.date.substring(0, 7));
  let months = [];
  let cases = [];
  for (const month in groupedByMonth) {
    const monthNum = parseInt(month.substring(5, 7));
    const monthText = monthNames[monthNum - 1];
    months.push(monthText);
    const highestcase = _.maxBy(groupedByMonth[month], o => o.cases);
    cases.push(parseInt(highestcase.cases));
  }
  if (months.length > 5) {
    months = months.slice(0, 5);
    cases = cases.slice(0, 5);
  }

  const lineGraphData = {
    labels: months,
    datasets: [
      {
        data: cases,
        // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        // strokeWidth: 2 // optional
      }
    ],
    // legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
  };
  return lineGraphData;
}

export async function getEnigmaNytimesData() {
  return await getCsvAsJSONFromGithub(nyTimesStateUrl);
}