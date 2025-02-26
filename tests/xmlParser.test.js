const fs = require('fs');
const parseXMLFile = require('../xmlParser');

jest.setTimeout(30000); // Set timeout to 30 seconds

describe('XML Parser', () => {
  test('should parse and transform XML data correctly', (done) => {
    const filePath = 'Sample1-PO5500000150_20230518184727_0000000000087110.xml';
    const expectedJson = JSON.parse(fs.readFileSync('Sample1-expected_results.json', 'utf8'));

    parseXMLFile(filePath, (err, transformedData) => {
      expect(err).toBeNull();
      expect(transformedData).toEqual(expectedJson);
      done();
    });
  });

  test('should handle non-existent file gracefully', (done) => {
    const filePath = 'non_existent_file.xml';

    parseXMLFile(filePath, (err, transformedData) => {
      expect(err).not.toBeNull();
      expect(transformedData).toBeNull();
      done();
    });
  });
});