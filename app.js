var GoogleSpreadsheet = require("google-spreadsheet");
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<h1>Google Drive Bridge v0.1</h1>' +
           '<p>For the Google Drive bridge to work you\'ll need to share your sheet with the service account: imposing-vista-130015@appspot.gserviceaccount.com</p>' +
           '<p>Use the api thisaway:</p>' +
           '<p>https://lant.uk/api/googledrive/v1/SPREADSHEET_ID/SHEET_INDEX/?field1=value1&field2=value2</p>' +
           '<p>The SPREADSHEET_ID can be copied from the Google Drive URL - it\'s <b>this</b> part: https://docs.google.com/spreadsheets/d/<b>1YDDXZRZv9qwu8Wmmuniy-eWcDcb2_pSG55YC5u9FKjE</b>/edit#gid=0</p>' +
           '<p>The SHEET_INDEX is the index of the sheet within the workbook, indexed from 1. If you\'ve only got one sheet in your workbook, SHEET_INDEX should be set to 1.</p>' +
           '<p>The field headings (<i>field1</i>) must match the headings in your sheet (else they won\'t be written to the sheet). e.g.:</p>' + 
           '<table border="1"><tr><th>field1</th><th>field2</th></tr><tr><td>value1</td><td>value2</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>'); 
});

app.get('/:sheetId/:index', function (req, res) {
  var doc = new GoogleSpreadsheet(req.params.sheetId);
  var credentials = require('./googledrive-bridge.json');
  
  doc.useServiceAccountAuth(credentials, function() {
    doc.addRow(req.params.index, req.query, function (e) {
      if(e) {
        res.send(e);
      }
      else {
        res.send('OK');
      }
    });
  });
});

app.listen(80, function () {
  console.log('Google Drive bridge is LIVE');
});
