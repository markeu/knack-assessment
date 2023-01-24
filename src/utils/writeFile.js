const fs = require('fs');
const path = require('path');

async function writeDataToJSONFile(fileName, data) {
    const dirPath = path.join(path.resolve(__dirname, '../../'), fileName);
    try {
        if (fs.existsSync(dirPath)) {
            fs.unlinkSync(dirPath);
        }
        const jsonData = JSON.stringify(data);
        await fs.promises.writeFile(dirPath, jsonData, { flag: 'wx' });
    } catch (err) {
        console.error(err);
    }
}





module.exports = writeDataToJSONFile;