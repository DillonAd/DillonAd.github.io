---
layout: post
title: Making Comments Count
category: [ code, style, comments ]
tags: [ code, style, comments ]
date: 2021-10-12
---

A generally accepted practice for writing software is leaving comments. These comments will hopefully be helpful to the next person that reads through the code. My overall goal when I comment code is to either describe the purpose of a method/class/file or the reasoning behind a decision that was made in the code. 

Some comments describe what the code is doing verbatim. These work really well in coding tutorials or when I'm learning a new language and I need to remind myself of the function of a particular operator. Outside of those scenario's I haven't found them as useful since they are telling me something I already know by reading the code.

```csharp
// Post-increment x and assign to y
var y = x++;
```

An exception to my previous statement, is when I find myself using a more esoteric operator, but in that case it is also nice to leave an explanation why the task couldn't be accomplished with a simpler approach.

My preferred type of comments provide context to future contributors (including myself once I've forgotten everything about that piece of code in about a week). These are the comments that save time down the road by helping future contributors avoid pitfalls that have already been found and remedied.

```csharp
// Using a loop instead of recursion due to intermittent StackOverflowExceptions
//  when processing deeply nested objects
while(condition)
{
    // ...
}
```

Happy commenting!