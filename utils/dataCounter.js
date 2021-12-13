const{writeFile, readFile} = require('fs').promises;
const FILE = '../utils/dataCounter.json';
const limits = require('../utils/limitconfig.js');

const read = async () => {
    const readedCounter = await readFile(FILE, 'utf8');
    const data = JSON.parse(readedCounter);
    return data;
};

const readCounter = async (counterName) => {
    const data = await read();
    if (counterName === 'content') {
        const value = data.ContentCounter;
        return value;
    } else if (counterName === 'database') {
        const value = data.DatabaseCounter;
        return value
    } else {
        throw new error('podano niepoprawną nazwę licznika')
    };
};

const changeCounter = async (counterName, value, operation) => {
    const data = await read();
    if(counterName === 'content') {
        operation==='add'? data.ContentCounter += value : data.ContentCounter -= value;
    } else if (counterName === 'database') {
        operation==='add'? data.DatabaseCounter += value : data.DatabaseCounter -= value;
    } else {
        throw new error('podano niepoprawną nazwę licznika');
        return;
    };
    await writeFile(FILE, JSON.stringify(data), 'utf8');
};


const checkCounter = async (counterName, value, operation) => {
    const data = await read();
    if(counterName === 'content') {
        if(data.ContentCounter + value > limits.contentLimit) {
            throw new Error('limit bazy danych został przekroczony, usuń stare dane aby zrobić miejsce na dysku')
            return false;
        } else {
            changeCounter(counterName, value, operation)
            return true;
        };
    };
    if(counterName === 'database') {
        if(data.DatabaseCounter + value > limits.databaseLimit) {
            throw new Error('limit bazy danych został przekroczony, usuń stare dane aby zrobić miejsce na dysku')
            return false;
        } else {
            changeCounter(counterName, value, operation)
            return true;
        };
    };
};

module.exports = {
    readCounter,
    changeCounter,
    checkCounter
}