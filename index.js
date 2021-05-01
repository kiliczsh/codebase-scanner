const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {

    const keyword = core.getInput('scan-keyword');
    console.log(`Keyword: ${keyword}!`);

    console.log("<<<START>>>");
    fs.readdir('../codebase', (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
    console.log("<<<EOF>>>");
    core.setOutput("result", "<none>");



    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    //console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}