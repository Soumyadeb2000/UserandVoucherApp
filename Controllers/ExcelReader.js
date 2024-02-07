const fs = require('fs');

const path = require('path');

const xlsx = require('xlsx');

const filePath = path.join(__dirname,'../', 'Files', 'data.xlsx');

const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(sheet);

exports.data = data;
