import _ from 'lodash';
import { swapKeysAndValues, csvToJSON, getAbbreviation } from '../util/utility';
import { getCsvAsJSONFromGithub } from './dataService';

const nyTimesUSUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv';


export async function getEnigmaNytimesUSData () {
  console.log('getEnigmaNytimesUSData');
  let data = await getCsvAsJSONFromGithub(nyTimesUSUrl);
  return _.orderBy(data, ['data'], ['asc']);
}

export const getDeathsInUSByTime = (data) => {

  let dates = data.map(record => record.date);
  let deaths = data.map(record => parseInt(record.deaths));

  const lineGraphData = {
    labels: dates,
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

export const getCasesInUSByTime = (data) => {

  let dates = data.map(record => record.date);
  let cases = data.map(record => parseInt(record.cases));

  const lineGraphData = {
    labels: dates,
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