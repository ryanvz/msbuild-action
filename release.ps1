#!/usr/bin/env pwsh
param (
  #[string]$GithubToken#,
  #[Parameter(Mandatory=$True, Position=0, ValueFromPipeline=$false)][file]$Archive
  $Csproj,
  $PublishProfile
  )
#param([string]$githubToken) 
#[Parameter(Mandatory=$True, Position=0, ValueFromPipeline=$false)]

if($GithubToken)
{
  #echo "hi"
  #echo $version
  #echo $GithubToken
  echo $args
}
$version = $(Get-Date -Format 'yyyy/MM/dd')

#gh auth login --with-token $githubToken

#gh release create $version dummy