#!/bin/bash

title=$1
now=$(date +'%Y-%m-%d')
fileName=$now-$title
filePath=./_drafts/$fileName.md
touch $filePath
chmod 744 $filePath

echo --- >> $filePath
echo layout: post >> $filePath
echo title: $title >> $filePath
echo category: [] >> $filePath
echo tags: [] >> $filePath
echo date: $now >> $filePath
echo --- >> $filePath