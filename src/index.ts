import * as core from "@actions/core";
import { MSBuild } from "./msbuild";

async function run() {
  try { 
    const csproj = core.getInput("csproj");
    const pubxml = core.getInput("pubxml");
    let builder = new MSBuild(csproj, pubxml);
    console.log(`Building ${csproj} ...`);
    await builder.build();
    core.setOutput('package', builder.artifact);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();