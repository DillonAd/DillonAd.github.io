---
layout: post
title: Watching Other Files With The .NET CLI
category: [ c#, dotnet-watch ]
tags: [ c#, dotnet, watch, dotnet-watch, other files ]
date: 2021-03-31
---

I ran into an odd scenario recently where I was working on SQL files to generate data via a C# program I had written. The simple solution was to have the `dotnet watch run` command watch for changes in the SQL files. The only problem was that the file watcher doesn't watch for SQL files by default. The first option I found was to declare each file in the project file and that was not a viable option given the number of files at hand. 

I needed a solution that would pick up the SQL files by recognizing the file extension. Lucky for me, the documentation around the `dotnet watch` command has grown significantly since the command was first released. All that is required to customize the watcher with a wildcard is a single entry in the project file.

```xml
<ItemGroup>
    <Watch Include="**\*.sql" />
</ItemGroup>
```

Those three lines instructed the file watcher to watch the SQL files in my project, making my day exponentially easier.
