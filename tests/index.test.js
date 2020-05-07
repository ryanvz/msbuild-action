const msbuild = require('../src/msbuild');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('build a project', async() =>{
  let build = new msbuild.MSBuild("tests/Example/Example.csproj", "CustomProfile");
  await build.build();
  expect(build.artifact).toContain("site.zip")
});
