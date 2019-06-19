---
layout: post
title: Random Azure DevOps Build Failures
category: [ build, devops ]
tags: [ Azure DevOps, Azure Pipelines, intermittent, failure ]
date: 2019-06-19
---

A few days ago, I started seeing some odd failures in one of my Azure DevOps Pipeline YAML builds. The error was:

```
/azure-pipelines.yml (Line: 1, Col: 1): Unexpected value 'name'
```

The beginning of the file looked like:

```YAML
name: $(Build.BuildId)
pool: Default

trigger:
 - master
```

After looking through the [documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema) repeatedly, a clue arose when doing a `git diff`. The output was:

```bash
diff --git a/azure-pipelines.yml b/azure-pipelines.yml
index 3fda759..4ece8de 100644
--- a/azure-pipelines.yml
+++ b/azure-pipelines.yml
@@ -1,5 +1,5 @@
+<U+FEFF>name: $(Build.BuildId)
-name: $(Build.BuildId)
```

`<U+FEFF>`?! Someone/something had snuck a [byte order mark (BOM)](https://en.wikipedia.org/wiki/Byte_order_mark) into the beginning of my pipeline file! It turns out that certain text editors in Windows environments will inject this character at the beginning a file.

Once this was identified as the problem, the solution in this case utilized Visual Studio Code. In the bottom right corner on the window, a piece of information listed is the file encoding. The encoding listed for this file was `UTF-8 with BOM`. Clicking on the encoding opens the Command Palette and presents options. Selecting either `Save with Encoding` or `Reopen with Encoding` and then saving the file gets rid of the offending character.

After that change was committed and pushed, the build succeeded. 
