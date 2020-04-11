const core = require('@actions/core');
const msbuild = require('./msbuild');

async function run() {
  try { 
    const csproj = core.getInput("csproj");
    const pubxml = core.getInput("pubxml");

    console.log(`Building ${csproj} ...`);   
    await msbuild(csproj, pubxml);
    //core.setOutput('package', new Date().toTimeString());
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run();