const {readFile, writeFile} = require('fs').promises;


const errorHandle = async (res, error, data) => {
    const path = `/error/${data}`
    res.redirect(path);

    const readeddata = await readFile('../utils/errorLog.json', 'utf-8');
    arr = JSON.parse(readeddata);
    const toSave = {
        error,
        date: Date.now(),
        info: data
    };
    arr.push(toSave);
    addfile = JSON.stringify(arr);
    await writeFile('../utils/errorLog.json', addfile, 'utf-8');
};

const readErrorHandle = async () => {
    const readeddata = await readFile('../utils/errorLog.json', 'utf-8');
    arr = JSON.parse(readeddata);
    return arr;
}

const clearErrorHandle = async () => {
    arr = JSON.stringify([]);
    await writeFile('../utils/errorLog.json', arr, 'utf-8');
}

module.exports = {
    errorHandle,
    readErrorHandle,
    clearErrorHandle
};