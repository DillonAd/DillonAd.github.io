---
layout: post
title: How To Create A Memory Leak In Golang
category: [go, golang, memory leak]
tags: [go, golang, memory leak]
date: 2022-01-05
---

A while ago I was monitoring a containerized application, and noticed an odd pattern in the graph for memory usage. The memory usage would climb steadily until reaching the memory limit set on the container and then precipitously drop to zero. This pattern would repeat as long as the application was running. I had a memory leak. _Cue ominous music_

The cause of the memory leak was a fairly simple thing, but due to multiple changes over time in this area of code I had completely missed it. Here is the relevant code:

```go
package main

func main() {
	running := true

	for running {
		defer func() {}()
	}
}
```

_Warning: If you execute this code on your machine, it will max out your CPU and eventually your memory_

I had deferred a function inside of a long running loop. Each time a function is deferred, it gets added to a stack or stack-like data structure (last in, first out). Once the function containing the `defer` is completed the stack for that function is emptied one by one and executed. The issue here is that the loop completing an iteration does not trigger the execution of the deferred functions, nor does exiting the loop. 

In my case, deferred functions would continue to be added to the deferred functions stack until the memory footprint finally exceeded what was allowed by the container causing the container to crash. A way around this issue, would be to wrap the `defer` statement in another function like this:

```go
package main

func main() {
	running := true

	for running {
		func() {
			defer func() {}()
		}()
	}
}
```
Wrapping the `defer` in a function causes the secondary function's deferred functions to be executed on every iteration instead of letting them accumulate indefinitely until the program finally finishes. That being said, the solution for my issue was to remove the deferred function from inside the loop. 

```go
package main

func main() {
	defer func() {}()

	running := true

	for running {}
}
```
