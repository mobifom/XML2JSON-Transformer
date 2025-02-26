# XML to JSON Transformer

This project provides a backend service that reads an XML file, transforms its content into JSON format, and saves the JSON to a specified output file. The service includes several features to enhance code resilience, including file existence checks, file readability checks, output path writability checks, and validation of the XML structure.

## Features
- **File Existence Check**: Ensures that the input XML file exists before attempting to read it.
- **File Readability Check**: Verifies that the input XML file is readable.
- **Output Path Writable Check**: Ensures that the output path for the JSON file is writable.
- **XML Structure Validation**: Validates the XML structure to ensure that required elements are present.
- **Leading Zero Removal**: Removes leading zeros from specific fields (`VendorNumber__`, `DocNumber__`, `Material__`).

## Prerequisites
- Node.js (version 20 or later)
- npm (Node Package Manager)

## Installation
1. Navigate to the project directory:

    cd XML2JSON-Transformer

2. Install the dependencies:

    npm install

## Running the Application
To run the application, provide the input XML file path and the output JSON file path as command-line arguments:
```sh
node server.js path/to/your/xmlfile.xml path/to/outputfile.json
```

Example:
```sh
node server.js Sample1-PO5500000150_20230518184727_0000000000087110.xml Sample1-expected_results.json
```
This command will read the XML file `Sample1-PO5500000150_20230518184727_0000000000087110.xml`, transform it into JSON, and save the result to `Sample1-expected_results.json`.

## Running the Tests
To run the tests, use the following command:
```sh
npm test
```
The tests will check the functionality of the XML parser, transformer and including handling of non-existent files.

## Code Resilience Features
The code includes several features to improve resilience and enhance the customer experience:

1. **File Existence Check**: The application checks if the input XML file exists before attempting to read it.
2. **File Readability Check**: The application verifies that the input XML file is readable.
3. **Output Path Writable Check**: The application ensures that the output path for the JSON file is writable.
4. **XML Structure Validation**: The application validates the XML structure to ensure that required elements are present. This prevents processing of invalid XML files.
5. **Error Handling**: Improved error messages provide more detailed information for debugging issues.

By implementing these features, the application ensures a more robust and user-friendly experience.