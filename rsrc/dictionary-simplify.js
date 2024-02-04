const fs = require('fs');

// Read the content of dictionary.json
const inputFile = 'dictionary.json';
const outputFile = 'filtered_dictionary.json';

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading ${inputFile}: ${err.message}`);
        return;
    }

    try {
        const dictionary = JSON.parse(data);

        // Filter out words with length greater than 7
        const filteredDictionary = Object.fromEntries(
            Object.entries(dictionary).filter(([word, definition]) => word.length <= 7)
        );

        // Write the filtered dictionary to a new file
        fs.writeFile(outputFile, JSON.stringify(filteredDictionary, null, 2), (err) => {
            if (err) {
                console.error(`Error writing ${outputFile}: ${err.message}`);
            } else {
                console.log(`Filtered dictionary has been saved to ${outputFile}`);
            }
        });
    } catch (parseError) {
        console.error(`Error parsing JSON from ${inputFile}: ${parseError.message}`);
    }
});
