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
  // sort dataset 
  let sortDataset = dataset
    .filter(data => !isNaN(Number(data))) // Filter out non-numeric values
    .map(data => Number(data)) // Convert to numbers
    .sort(); // sort the data in ascending order

  let totalNoOfDataset = sortDataset.length 
  let middleIndex = Math.floor(totalNoOfDataset * 0.5)
  if (totalNoOfDataset % 2 === 0){
    // for dataset with even no. of items
    let medianValues = [sortDataset[middleIndex - 1], sortDataset[middleIndex]]
    return calculateMean(medianValues);
  } else {
    // for dataset with odd no. of items
    return sortDataset[middleIndex]
  }
}

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
  fileExists(csvFile);
  // read data from csv file & store in linesArray
  const data = fs.readFileSync(csvFile, "utf-8");
  const linesArray = data.split(/\n/)
  // console.log(linesArray)
  return linesArray;

  // skip first row condition [0]
  // skip first and second rows [0,1]
  // skip no rows []
  // const skipRowConditions = {
  //   "[0]": {return linesArray.shift()},//"skip first row"
  //   "[0, 1]": "skip first and second row",
  //   "[]": "skip no rows"
  // }
  if (ignoreRows === '[0]') { return linesArray.shift() }
  if (ignoreRows === '[0,1]') { return linesArray.splice(0,2) }
  if (ignoreRows === '[]') { return linesArray }

  if (ignoreCols === '[0]') { return linesArray.shift() }
  if (ignoreCols === '[0,1]') { return linesArray.splice(0,2) }
  if (ignoreCols === '[]') { return linesArray }

}

// test
// const [salesData, totalRows, totalColumns] = loadCSV(
//   "./sales_data.csv",
//   [0], // Ignore first row (headers)
//   [] // Include all columns
// );

// console.log([salesData, totalRows, totalColumns])
// totalRows → 7 (6 data rows + 1 header)
// totalColumns → 7
// salesData will be:
// [
//   ['2024-01-15', 'North', 'Laptop', '5', '999.99', '4999.95', 'completed'],
//   ['2024-01-15', 'South', 'Phone',  '10', '499.99', '4999.90', 'completed'],
//   ['2024-01-16', 'North', 'Tablet', '3', '699.99', '2099.97', 'pending'],
//   ['2024-01-16', 'East',  'Laptop', '7', '999.99', '6999.93', 'completed'],
//   ['2024-01-17', 'West',  'Phone',  '4', '499.99', '1999.96', 'completed'],
//   ['2024-01-17', 'South', 'Tablet', '6', '699.99', '4199.94', 'cancelled']
// ]

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