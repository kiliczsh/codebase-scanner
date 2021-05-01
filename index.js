const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
var fif = require('find-in-files');

try {

    const keyword = core.getInput('scan-keyword');
    const codebasepath = core.getInput('codebase-path');
    console.log(`Keyword: ${keyword}!`);
    console.log(`Codebase Path: ${codebasepath}!`);

    fif.find(keyword, codebasepath, '.js$')
        .then(function(results) {
            core.setOutput("result", results);
            for (let result in results) {
                let res = results[result];
                console.log(
                    'Found "' + res.matches[0] + '" ' + res.count
                    + ' times in "' + result + '"'
                );
            }
        });

    // let currentPath = process.cwd();
    // console.log(currentPath);
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}