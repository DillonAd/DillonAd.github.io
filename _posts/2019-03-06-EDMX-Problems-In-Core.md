---
layout: post
title: "EDMX Problems In .NET Core"
category: [ dotnet core, dotnet core 2.2, edmx, entity framework, entity framework 4, EF4 ]
tags: [ dotnet, core, edmx, database first ]
date: 2019-03-06
comments: true
---

Last year, I was at a client and I had to integrate an Entity Framework 4 library into a new shiny .NET Core application. The library had already been converted to .NET Standard, therefore I made the assumption that this would be the _easy_ part of delivering this software. 

I was _so_ wrong.

## Prelude To Madness

Database-First Entity Framework projects get compiled into three seperate files: `{name}.csdl`, `{name}.ssdl`, and `{name}.msl`. I checked for these files in the `/bin` folder and there were no files with those extensions. As any developer/engineer faced with a problem that I didn't know the answer to, I Googled it. 

I learned many things through my searching. First and foremost was that there was almost _no one_ using Entity Framework 4 (EF4) anymore (or at least anyone that would publicly admit it). The next thing I learned is that the few people who were admitting to still using EF4, were not moving to .NET Core just yet. 

Then I stumbled across a GitHub issue that suggested tracing through the verbose build output. Finally something I can work with! I delved in and scanned through over *10,000* lines of build output looking for errors, anomalies, or other general weirdness. There was _nothing_. The file extensions of either the pre or post compiler files were nowhere to be found.

**Back to Google!**

After another hour or so of completely fruitless searches, I removed the EF4 keywords from my search and found the answer on StackOverflow (of course).

## The Answer

It turns out that neither EF4 nor .NET Core had anything to do with the issue. I had added the dependency of Entity Framework Core (EF Core) and as it turns out EF Core does not support the Database First approach, only the Code First approach. So after swapping EF Core for Entity Framework 6, everything was working as expected. :tada:

## Lessons Learned

 - Try not to get tunnel vision by focusing on the obvious culprit after having done the basic due dilligence
 - Consider the search parameters being used and swap them out selectively
