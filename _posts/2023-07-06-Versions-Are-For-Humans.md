---
layout: post
title: Versions Are For Humans
category: [deployment, packaging, software, version]
tags: [deployment, packaging, software, semantic, version, semantic version, human, engineer]
date: 2023-07-06
---

What does it mean to version a piece of software? I believe that it applies a _meaningful_ label to indicate the capabilities of the software at that point in time. As software engineers, the most common method of doing this is [semantic versioning](https://semver.org/). Each number in a semantic version conveys a meaning for a human to understand and use as a basis their decisions. 

If these version numbers are meant for humans to derive meaning from, the incrementation of any part of the version should _not_ be automated. Automatically incrementing a version strips the version of it's meaning. Let's say that we increment the patch version of a softare package each time we merge to the `main` branch. The issue is anyone consuming this software package has _no clue_ whether there are breaking changes, new features, or just bug fixes in the new version. 

Version numbers are meant for humans, and they should be set by humans. The engineers making changes to a software package should set the new version number as a part of their change. They are the ones that understand the change best and are the most suited to translate the effects of the change into a semantic version.
