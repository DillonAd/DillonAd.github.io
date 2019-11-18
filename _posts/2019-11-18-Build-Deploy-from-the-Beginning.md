---
layout: post
title: Build/Deploy from the Beginning
category: [ automation, deployment, build ]
tags: [ automation, deployment, build, release ]
date: 2019-11-18
---

When I start a project, I like to follow a few steps to speed things along later. The first is to get the basic project compiling successfully and the next step is to set up the automated build and deployment infrastructure (bonus points if the build/release can be put into version control with the codebase). Some of the benefits of setting up the build/deploy infrastructure early on include automated feedback, easier deployment, and informed design choices.

## Automated Feedback

Setting up an automated build/deploy provides an early feedback mechanism for those working on the codebase. This feedback provides extraordinarily valuable feedback to those working on the codebase. This feedback includes if the merged code builds and if all of the new and existing tests are passing. While this all _should_ be confirmed locally, people make mistakes and sometimes things slip. 

## Easier Deployment

Building on the _Automated Feedback_, changes can be made to the codebase freely without impacting the ability to deliver the software. A symptom of spending excessive amounts of time developing code is a rough and lengthy process figuring out how to deploy that code. By allowing the build/deploy process to grow with the codebase, the necessary changes to build and deploy the product will be included as the codebase grows. This allows the person with the greatest understanding of the change to make the incremental changes to the build/release process.

## Informed Design Choices

As the product's codebase grows, more and more design choices are made and each of those choices involves trade offs, incurring [opportunity cost](https://en.wikipedia.org/wiki/Opportunity_cost). The earlier these choices are made, the greater the impact is to the whole system. Having build and deployment infrastructure from the beginning forces decisions involving deployment to be considered as the changes are being made. This way changes that incur an unacceptable amount of deployment pain can be either avoided, or reverted with much less pain since there aren't any dependent changes yet.

## Conclusion

In the end, the goal is to be able to produce and deliver excellent, quality software with as little pain as possible. Setting up build/deploy infrastructure early on can alleviate the pain of developing a product and then figuring out how to release it.
