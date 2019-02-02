#!/bin/bash
now=$(date +'%Y-%m-%d')
fileName=$now-$1
touch ./_drafts/$fileName
chmod 744 ./_drafts/$fileName