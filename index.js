const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
var fif = require('find-in-files');

try {

    const keywordInput = core.getInput('scan-keyword');
    const codebasepathInput = core.getInput('codebase-path');
    const extensionInput = core.getInput('extension-filter');
    const failBuildInput = core.getInput('pass-fail');
    let failBuild = failBuildInput === 'true' ;
    extensionInput.concat('$');
    console.log(`Searching for ${keywordInput} in ${codebasepathInput}!`);

    let scanResult = "";
    fif.find(keywordInput, codebasepathInput, extensionInput)
        .then(function(results) {
            for (let result in results) {
                let res = results[result];
                let msg = String(`Found '${res.matches[0]}'  ${res.count} times in '${result}'`);
                scanResult = String(`${scanResult} \n ${msg}`);
                console.log(scanResult);
            }

            if(scanResult === ''){
                core.setOutput('results', `${keywordInput} is not exists in ${codebasepathInput}`);
            }else{
                core.setOutput('results', `${scanResult.toString()}`);
                if (failBuild) {
                    core.setFailed(`Remove ${keywordInput} from your ${codebasepathInput}`);
                }
            }
        });
} catch (error) {
    core.setFailed(error.message);
}