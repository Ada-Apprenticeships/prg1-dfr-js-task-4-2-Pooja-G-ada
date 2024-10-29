const fs = require("fs");

function fileExists(filename) {
  return fs.existsSync(filename);
}

function validNumber(value) {
  const regexNumber = /^-?\d{1,}(\.\d{1,})?$/;
  return regexNumber.test(value)
}

function dataDimensions(dataframe) {
  if (typeof dataframe === 'undefined'|| dataframe === '') return [-1, -1];
  let rows = dataframe.length; 
  let columns = Array.isArray(dataframe[0]) ? dataframe[0].length : -1 ;
  return [rows, columns];
}

function findTotal(dataset) {
  // check for invalid input
  if (Array.isArray(dataset[0]) || !dataset.length) return 0;
  // if the input is valid
  let sum = 0
    dataset.forEach(value => {
      if (validNumber(value)) sum = sum + parseFloat(value);
    })
  return sum;
}

function calculateMean(dataset) {
  // check for invalid input
  if (Array.isArray(dataset[0]) || !dataset.length) return 0;
  // if the input is valid
  let noOfValues = 0
    dataset.forEach(value => {
      if (validNumber(value)) {
        noOfValues ++; 
      };
    })
  return findTotal(dataset) / noOfValues;
}

function calculateMedian(dataset) {
  // check for invalid input
  if (Array.isArray(dataset[0]) || !dataset.length) return 0;
  // sort data in ascending order >> filter out Not-a-Number >> map/iterate to cast each item/data into number 
  let sortDataset = dataset.sort().filter(data => { if (Number(data) !== 'NaN') return Number(data) }).map(data => Number(data))

  let totalNoOfDataset = sortDataset.length 
  if (totalNoOfDataset % 2 === 0){
    // for dataset with even no. of items
    let medianIndexes = [(totalNoOfDataset * 0.5) - 1, ((totalNoOfDataset * 0.5))]
    let medianValues = medianIndexes.map(index => sortDataset[index])
    return calculateMean(medianValues);
  } else {
    // for dataset with odd no. of items
    let medianIndex = Math.floor(totalNoOfDataset * 0.5)
    return sortDataset[medianIndex]
  }
}

// test
const responseTimes = [1.5, 1.9, 10.0, 50, -10, "3", "1"];
calculateMedian(responseTimes); // → 1.9

// const evenDataset = [1, 2, 3, 4];
// calculateMedian(evenDataset); // → 2.5 (average of 2 and 3)

const invalidData = [[1], [2]]; // 2D array instead of dataset
calculateMedian(invalidData); // → 0

const testData = [10, 20, "30", "invalid", 40, 50]; // 2D array instead of dataset
calculateMedian(testData); // → 30

const evenDataset = [10, 20, 30, 40]
calculateMedian(evenDataset); // → 30



function convertToNumber(dataframe, col) {
  // returns an integer, which is the number that were  converted to floats.
  let countOfColumns = 0;
  dataframe.forEach(row => {
    if (validNumber(row[col]) && typeof row[col] !== 'number') {
      row[col] = parseInt(row[col])
      countOfColumns ++;
    };
  })
  return countOfColumns;
}

function flatten(dataframe) {
  // returns a dataset (a flattened dataframe)
  let flatDataSet = []
  if (dataDimensions(dataframe)[1] !== 1){
    return []
  } else {
    dataframe.forEach(row => flatDataSet.push(row[0]));
  }
  return flatDataSet
}

function loadCSV(csvFile, ignoreRows, ignoreCols) {

}


function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {

}

module.exports = {
  fileExists,
  validNumber,
  dataDimensions,
  calculateMean,
  findTotal,
  convertToNumber,
  flatten,
  loadCSV,
  calculateMedian,
  createSlice,
};