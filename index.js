const core = require('@actions/core');
const github = require('@actions/github');

try {

    const keyword = core.getInput('scan-keyword');
    console.log(`Keyword: ${keyword}!`);
    core.setOutput("result", "<none>");

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}