---
layout: post
title: "Docker for Developers"
category: [ docker ]
tags: [ docker, developers, multi-platform ]
date: 2019-03-29
comments: true
---

I found myself needing to switch from a Windows environment to a Linux environment. During that process, one thing became very apparent: This sucks!

I needed a solution that would allow me to switch environments seamlessly.

_Enter Docker_

Docker has been touted as the solution for many issues. Most of those have been convered extensively by other sources, so I won't waste time repeating them. This is a solution to get developers up and running as quick as possible on almost any platform.

## How it works

The solution is composed of three Docker containers orchestrated by Docker Compose. The three containers are:
 - Angular (Image: `teracy/angular-cli`)
 - .Net Core (Image: `microsoft/dotnet:sdk`)
 - Microsoft SQL Server Database (Image: `microsoft/mssql-server-linux`)

The Microsoft SQL Server container runs pretty much as-is with the settings required by the documentation. Outside of settings, this container will _not_ persist data after it shuts down. Persistence can be achieved via another volume mount to the data store's data directory. Any database infrastructure that needs to be set up will have to be set up after the container spins up. Some containers provide solutions for this, but these solutions vary based on the container being used. So taking .Net's Entity Framework as an example, the code first migrations would need to be run once the database container finished starting.

The Angular and .Net Core container declarations specify one thing different from the Microsoft SQL Server container declaration. The difference is the `volumes` element in the `docker-compose.yml` YAML configuration. This allows the containers' file system to reflect the local file system specified ( - `local path`:`container path` ). This way the `watch` commands can see the changes and respond appropriately.

> _Windows Users_
>
> There is one small caveat for Windows users. There is a known limitation that does not allow file change  events to be seen by the container. That renders this solution pretty much useless. Luckily the Open Source community came through! A tool was developed and published called `docker-watch` (Links available in the Resources section) and it is available via the `dotnet tool` ecosystem. (There are other implementations in other languages, but I haven't used them and therefore can't recommend any of those solutions)

## Conclusion

This solution provides a few different advantages:
 - Easy setup for new contributors
 - Cross platform portability
 - Portable data solution that is easily reset

In the end, there are multiple use cases for this kind of solution. From new developer setup to just needing to switch machines/operating systems seamlessly, this solution is perfect!

## Resources
 - [Working Example](https://github.com/DillonAd/docker4devs)
 - [Docker-Watch NuGet](https://www.nuget.org/packages/docker-watch) 
 - [Docker-Watch GitHub](https://github.com/nickvdyck/docker-watch)

## Addendum

An unexpected result of this post has been a request for a full tutorial, so I will be spending the next few posts detailing the intricacies, advantages, and shortcomings of this approach.