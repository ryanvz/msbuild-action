# MSBuild Action

This action builds a c# project and, optionally, runs a "publish" action. It is designed for and tested against an ASP.NET website which is published to an msdeploy package (a zip with an asinine folder structure).

## Requirements

As this is intended to build .NET Framework projects with msbuiild, it must be run on Windows.

## Inputs

### `csproj`

**Required** The path of the `csproj` file to build.

### `pubxml`

The name, without extension, of the `pubxml` file which describes the publish steps. This will automatically look for it inside the  `/Properties/PublishProfiles/` subdirectory of the location of your csproj file.

## Outputs

### `package`

The path to the packaged zip file.

## Example usage

```yaml
uses: ryanvz/msbuild-action@master
with:
  csproj: Web/Web.csproj
  pubxml: DebugPackageProfile
```