const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {

    const keyword = core.getInput('scan-keyword');
    console.log(`Keyword: ${keyword}!`);

    function getFiles (dir, files_){
        files_ = files_ || [];
        let files = fs.readdirSync(dir);
        for (let i in files){
            let name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }

    console.log(getFiles('.'))

    let currentPath = process.cwd();
    console.log(currentPath);
    core.setOutput("result", "<none>");



    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    //console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}