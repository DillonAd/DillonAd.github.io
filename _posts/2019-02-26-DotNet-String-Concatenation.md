---
layout: post
title: "String Concatenation Performance"
category: [ string, concatenation, performance ]
tags: [ c#, performance ]
date: 2019-02-26
comments: true
---

> How do I concatenate strings in C#?

This is a pretty common question amongst beginners. Building a string is a basic function for any programming language, but how that string is built can matter greatly to a program's performance. The typical wisdom in C# for this question is to use the `System.Text.StringBuilder` class. Using a class instead of using the basic concatenation features of the language has overhead though. 

So the major question is: At what point does it make sense to incur the overhead of instantiating the `StringBuilder` class?

There were two options that were tested:
 - Use the `StringBuilder` class
 - Concatenation with the `+` operator

![Graph](https://raw.githubusercontent.com/DillonAd/dotnet-performance-metrics/master/StringBuilder/PerformanceGraph.png)

\* _BenchmarkDotNet was used to collect the above metrics._

The results showed that the point at which instantiating the `StringBuilder` class merits the overhead is **_10_** concatenations. All of which means, small occurences of concatenation using the `+` operator is actually more efficient. If a lot of concatenations (i.e. possibly more than 10) are going to occur, it is best to centralize that logic and utilize a single instance of the `StringBuilder` class.

## Resources

 - [BenchmarkDotNet](https://github.com/dotnet/BenchmarkDotNet)
 - [Test Case Source](https://github.com/DillonAd/dotnet-performance-metrics)