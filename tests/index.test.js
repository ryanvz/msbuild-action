const msbuild = require('../src/msbuild');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('build a project', async() =>{
  let build = new msbuild.MSBuild("tests/Example/Example.csproj", "Properties/PublishProfiles/CustomProfile.pubxml");
  await build.build();
  console.log(build.artifact);
  expect(build.artifact).toContain("site.zip")
});