#!/bin/bash

title=$1
now=$(date +'%Y-%m-%d')
fileName=$now-$title

currentDirectory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
draftDirectory="$currentDirectory/_drafts"
if [[ ! -d "$draftDirectory" ]]; then
  mkdir $draftDirectory
fi

filePath=$draftDirectory/$fileName.md
touch $filePath
chmod 744 $filePath

echo --- >> $filePath
echo layout: post >> $filePath
echo title: $(echo $title | tr '-' ' ') >> $filePath
echo category: [] >> $filePath
echo tags: [] >> $filePath
echo date: $now >> $filePath
echo --- >> $filePath