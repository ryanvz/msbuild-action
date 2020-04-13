import { exec } from '@actions/exec';

const msbuildPath = '"C:/Program Files (x86)/Microsoft Visual Studio/2019/Enterprise/MSBuild/Current/Bin/MSBuild.exe"';
const packageRegex = /(?<=Packaging into )(.*)(?=.)/;
// if packet .paket\paket restore

export class MSBuild {
  private _artifact: string = "";

  get artifact(): string { return this._artifact; }

  constructor(readonly csproj: string, readonly pubxml: string) {
    this.csproj = csproj;
    this.pubxml = pubxml;
  }

  async build() {
    var args = [];
    if (this.pubxml) {
      args.push(
        '/p:DeployOnBuild=true',
        `/p:PublishProfile=${process.cwd()}/${this.pubxml}`
      );
    }
    args.push(this.csproj)

    let options = {
      listeners: {
        stdout: (data: Buffer) => {
          var match = data.toString().match(packageRegex);
          if (match) {
            console.log(`Found package at [[${match}]]`)
            this._artifact = match.toString();
          }
        }
      }
    };
    return exec(msbuildPath, args, options);
  }
}

/*
PackageUsingManifest:
  Packaging into C:\Users\ryan\source\msbuild_test\msbuild_test\output\site.zip.
  Starting Web deployment task from source: manifest(C:\Users\ryan\source\msbuild_test\msbuild_test\output\site.SourceM
  anifest.xml) to Destination: package(C:\Users\ryan\source\msbuild_test\msbuild_test\output\site.zip).
  Adding sitemanifest (sitemanifest).
  Adding IIS Application (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp)
  Creating application (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp)
  Adding virtual path (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp)
  Adding directory (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp).
  Adding directory (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp\bin).
  Adding file (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp\bin\msbuild_test.dll).
  Adding file (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp\bin\msbuild_test.pdb).
  Adding file (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp\Global.asax).
  Adding file (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp\Web.config).
  Adding ACLs for path (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp)
  Adding ACLs for path (C:\Users\ryan\source\msbuild_test\msbuild_test\obj\Debug\Package\PackageTmp)
  Adding declared parameter 'IIS Web Application Name'.
  Successfully executed Web deployment task.
  Package "site.zip" is successfully created as single file at the following location:
  file:///C:/Users/ryan/source/msbuild_test/msbuild_test/output
  To get the instructions on how to deploy the web package please visit the following link:
  https://go.microsoft.com/fwlink/?LinkId=124618
GenerateSampleDeployScript:
  Sample script for deploying this package is generated at the following location:
  C:\Users\ryan\source\msbuild_test\msbuild_test\output\site.deploy.cmd
  For this sample script, you can change the deploy parameters by changing the following file:
  C:\Users\ryan\source\msbuild_test\msbuild_test\output\site.SetParameters.xml
PipelineDeployPhase:

*/