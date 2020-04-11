const core = require('@actions/core');
const exec = require('@actions/exec');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const csproj = core.getInput("csproj");
    //const pubxml = core.getInput("pubxml");

    const msbuild = "C:/Program Files (x86)/Microsoft Visual Studio/2019/Enterprise/MSBuild/Current/Bin/MSBuild.exe";

    console.log(`Building ${csproj} ...`);
    // if packet .paket\paket restore

    //' /p:DeployOnBuild=true /p:PublishProfile=%cd%\Properties\PublishProfiles\DebugProfile.pubxml JungleServices.csproj'

    await exec.exec(msbuild, csproj);

    //core.debug((new Date()).toTimeString());
    //await wait(parseInt(ms));

    //core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run();