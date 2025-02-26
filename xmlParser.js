const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

// Function to remove leading zeros for specific fields
const removeLeadingZeros = (key, str) => {
  const fieldsToClean = ['VendorNumber__', 'DocNumber__', 'Material__'];
  if (fieldsToClean.includes(key)) {
    return str.replace(/^0+/, '');
  }
  return str;
};

// Function to transform XML data to JSON dynamically
const transformData = (data) => {
  const transformNode = (node, parentKey = '') => {
    if (typeof node === 'string') {
      return removeLeadingZeros(parentKey, node);
    } else if (Array.isArray(node)) {
      // If array has a single element, return that element directly
      if (node.length === 1) {
        return transformNode(node[0], parentKey);
      }
      return node.map((item) => transformNode(item, parentKey));
    } else if (typeof node === 'object') {
      const transformedNode = {};
      for (const key in node) {
        transformedNode[key] = transformNode(node[key], key);
      }
      return transformedNode;
    }
    return node;
  };

  return transformNode(data);
};

// Function to parse XML file and apply transformations
const parseXMLFile = (filePath, callback) => {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    callback(new Error('Input file does not exist'), null);
    return;
  }

  // Check if the file is readable
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      callback(new Error('Input file is not readable'), null);
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        callback(new Error('Error reading input file'), null);
        return;
      }

      parser.parseString(data, (err, result) => {
        if (err) {
          callback(new Error('Error parsing XML file'), null);
          return;
        }

        // Validate XML structure
        if (!result.PurchaseOrder || !result.PurchaseOrder.POHeaderDetails || !result.PurchaseOrder.POItemDetails || !result.PurchaseOrder.DeliveryAddressDetails) {
          callback(new Error('Invalid XML structure'), null);
          return;
        }

        const transformedData = transformData(result);
        callback(null, transformedData);
      });
    });
  });
};

module.exports = parseXMLFile;