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
  let flatDataSet = []
  if (dataDimensions(dataframe)[1] !== 1){
    return []
  } else {
    dataframe.forEach(row => flatDataSet.push(row[0]));
  }
  return flatDataSet
}

function loadCSV(csvFile, ignoreRows, ignoreCols) {
  // check if CSV file exists
  if (fileExists(csvFile) === false) return [[], -1, -1];

  // Read csv file content
  const data = fs.readFileSync(csvFile, "utf-8");

  // split content by lines - 1D array
  const lines = data.split(/\n/);
  
  // process each line and split it into columns - 2D array
  const dataMatrix = []
  lines.forEach(line => {
    dataMatrix.push(line.split(','));
  })

  // remove specified rows
  ignoreRows.forEach(ignoreRowIndex => {
    dataMatrix.splice(ignoreRowIndex, 1);
  })

  // remove specified columns
  ignoreCols.forEach(ignoreColIndex => {
    for (let row = 0; row < dataMatrix.length; row++){
      dataMatrix[row].splice(ignoreColIndex, 1);
    }
  })

  // calculate total no. of columns & rows of processed data
  const totalRows = dataMatrix.length + 1;
  const totalColumns = dataMatrix[0].length;

  return [dataMatrix, totalRows, totalColumns];
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