const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {

    const keyword = core.getInput('scan-keyword');
    const codebasepath = core.getInput('codebase-path');
    console.log(`Keyword: ${keyword}!`);
    console.log(`Codebase Path: ${codebasepath}!`);

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

    let filePaths = getFiles(codebasepath);
    console.log(filePaths)

    for(let p in filePaths){
        console.log("Searching "+ p);
        fs.readFile(p, function (err, data) {
            if (err) throw err;
            if(data.includes(keyword)){
                console.log(data);
            }
        });
    }

    let currentPath = process.cwd();
    console.log(currentPath);
    core.setOutput("result", "<none>");



    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    //console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}