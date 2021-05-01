const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
var fif = require('find-in-files');

try {

    const keyword = core.getInput('scan-keyword');
    const codebasepath = core.getInput('codebase-path');
    const extension = core.getInput('extension-filter');
    extension.concat('$');
    console.log(`Searching for ${keyword} in ${codebasepath}!`);

    let scanResult = "";
    fif.find(keyword, codebasepath, extension)
        .then(function(results) {
            for (let result in results) {
                let res = results[result];
                let msg = String(`Found '${res.matches[0]}'  ${res.count} times in '${result}'`);
                scanResult = String(`${scanResult} \n ${msg}`);
                console.log(scanResult);
            }
            core.setOutput('results', `${scanResult.toString()}`);
        });
} catch (error) {
    core.setFailed(error.message);
}