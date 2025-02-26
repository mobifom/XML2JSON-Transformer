const fs = require('fs');
const parseXMLFile = require('./xmlParser');

const [filePath, outputFilePath] = process.argv.slice(2);
if (!filePath || !outputFilePath) {
  console.error('Input file path and output file path are required as command-line arguments');
  process.exit(1);
}

// Check if the output path is writable
fs.access(outputFilePath, fs.constants.W_OK, (err) => {
  if (err && err.code !== 'ENOENT') {
    console.error('Output file path is not writable');
    process.exit(1);
  }

  parseXMLFile(filePath, (err, transformedData) => {
    if (err) {
      console.error('Error processing XML file:', err.message);
      process.exit(1);
    }

    fs.writeFile(outputFilePath, JSON.stringify(transformedData, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err.message);
        process.exit(1);
      }
      console.log('Transformed data saved to', outputFilePath);
    });
  });
});