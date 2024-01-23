---
layout: post
title: Git-ing Started
category: [git, workflow]
tags: [git, version control, vcs, developer workflow, developer experience]
date: 2024-01-22
---

When starting to learn Git you will see a lot of people claiming that Git is complicated and hard to use. Mostly because Git is complicated and hard to use. You can do a _lot_ of wild and crazy things with Git, but to function on a day to day basis only a few commands are needed to do the basic Git workflow.

## The Basic Workflow

First we need to clone the repository. This can be an existing repository or a new one that was just created. This will copy the repository code down to your computer, and set you up with the latest that is on the default branch (typically named `main` or `master`)

```bash
git clone <RepositoryURL>
```

Most workflows won't allow you to make changes directly to the default branch, so you will have to make your own branch. This is an area where you can make your changes. 

```bash
git checkout -b <BranchName>
```

That command is shorthand for creating a branch and then switching to that branch. The long way around is these two commands.

```bash
git branch <BranchName>
git checkout <BranchName>
```

Once your changes are made, you will need to stage them to be committed/saved. You do this by adding the files directly, but I tend to just include everything. If you want to add specific directories or files, set the path to the file or directory instead of the `.` in the command.

```bash
git add .
```

Next we want to make our changes permanent. We do this by committing them with a hopefully meaningful commit message. If every commit message is the same generic message, it can create a terrible situation when you need to do more advanced things down the road. 

```bash
git commit -m "<Message>"
```

Last, but certainly not least, we want to persist our changes outside of our computer. We need to push them up to the server that we initially cloned them from. For new branches, we will need to specify the target branch on the server.

```bash
git push --set-upstream origin <BranchName>
```

If the branch has already been pushed, we can use a simple push.

```bash
git push
```

## Giving up

Every once in a while, you get to a point with a branch that you just want to reset everything back to where you started at the last commit. The specific motivations behind this are wide ranging, but each is valid and you deserve a solution. 

```bash
git checkout .
git clean -fdx
```

The `checkout` command resets any existing files back to their original state. The `clean` command deletes any newly created files (`f`), directories (`d`), and any files that Git is set to ignore (`x`).

## Conclusion

There are a lot more features in Git that people has literally written books about. Once you have mastered the basics, then I would recommend looking into the more advanced features. I have been using Git for almost about decade at this point and I rarely use the more advanced features of this tool so I highly recommend a focus on the things that you will actually use.

If you end up in a situation where you are stuck, there is a website called [Oh Shit, Git!?!](https://ohshitgit.com/) that is an excellent resource. 

Hopefully this helps you Git going!
