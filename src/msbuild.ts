import { exec } from '@actions/exec';
import { execSync } from 'child_process';
import path from 'path';

const msbuildPath = '"' + execSync('vswhere -latest -requires Microsoft.Component.MSBuild -find MSBuild\\**\\Bin\\MSBuild.exe').toString().trim() + '"';
const packageRegex = /(?<=Packaging into )(.*)(?=.)/;

export class MSBuild {
  private _artifact: string = "";

  get artifact(): string { return this._artifact; }
  get root(): string { return path.resolve(this.csproj, '..') }
  get pubxmlPath(): string { return `${this.root}/Properties/PublishProfiles/${this.pubxml}.pubxml`}

  constructor(readonly csproj: string, readonly pubxml?: string) {
    this.csproj = csproj;
    this.pubxml = pubxml;
  }

  async build() {
    var args = [];
    if (this.pubxml) {
      args.push(
        '/p:DeployOnBuild=true',
        `/p:PublishProfile=${this.pubxmlPath}`
      );
    }
    args.push(this.csproj);

    let options = {
      listeners: {
        stdout: (data: Buffer) => {
          var match = data.toString().match(packageRegex);
          if (match) {
            this._artifact = match[0];
          }
        }
      }
    };
    return exec(msbuildPath, args, options);
  }
}
