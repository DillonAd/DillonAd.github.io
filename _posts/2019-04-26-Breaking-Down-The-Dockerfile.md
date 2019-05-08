---
layout: post
title: Breaking Down The Dockerfile
category: [ Docker ]
tags: [ Docker, Dockerfile, break down, beginner ]
date: 2019-04-26
---

Let's talk Docker! Docker is a container platform that allows developers to control the environment to which their application is deployed. This is great for a few reasons, the first is there are no more issues of _"it works on my machine"_ since the container image you are testing against is the container that will be deployed. The next advantage is that containerized applications make it easy to demo an application or a new configuration without having to risk your local system. (I plan on covering the local demos/configurations more in another blog post, since this one will already be quite large by my standards.) Both of these provide a lot of power and flexibility across both production and non-production use cases. 

Starting out with Docker can be somewhat intimidating. It was for me at least. I remember the first time I looked at a Dockerfile. I picked a fairly complicated example and I was immediately overwhelmed. Once I stopped trying to understand the Dockerfile as a whole and broke it down line by line, I got a better understanding of what was happening. 

A few definitions first:
  - So what is a Dockerfile?
    - A Dockerfile contains the steps necessary to create a Docker image. 
  - Image?
    - The image is a snapshot of the application or workload that is described in the Dockerfile. This will be the basis for the container.
  - Container?
    - The Docker website says a container is "a standardized unit of software". Personally I think of the container as the execution of the image snapshot. 

Lets get started!

First thing is first, download and install Docker. To do this go to the [Docker Installation Guide](https://docs.docker.com/install/), select your OS, and follow the instructions. (This is going to require that you create a Docker account. I know it's a pain. I have opinions on this, but they aren't relevant in this context) 

Next create an application! If you don't want to get distracted from this walk-through or don't want to bother installing the `dotnet` SDK, clone [this repo](https://github.com/DillonAd/simple-api). Once that is done, create a file in the root directory of the project named `Dockerfile`. You can name this file anything you like, but to make things easier I like to follow the Docker convention and just use the name `Dockerfile`.

### Where did this come FROM?

``` Dockerfile
FROM dotnet:sdk-2.2
```

Almost every Dockerfile will start with the keyword `FROM`. The value following the `FROM` keyword is the Docker image being used to build on top of. If you have the inclination to start from nothing then there is an option to use `FROM scratch` ([Source](https://docs.docker.com/develop/develop-images/baseimages/)), but I try to avoid this since most popular operating systems have great offerings.

In the above example, the image being called is the `dotnet` image tagged with `sdk-2.2`. Each Docker image can have multiple tags that indicate different purposes or versions. In this case, the chosen image is the .NET Core 2.2 SDK. That means that during the build and execution of the image all of the abilities of the .NET Core SDK are at that image's disposal. 

> How did you find that image?

All of these images are available via [Docker Hub](https://hub.docker.com).

### Where are we!?

``` Dockerfile
WORKDIR /app
```

Generally the working directory of most Linux OS images is the root directory (`/`). Since running applications from the root directory can be confusing and a potential security risk, this command will both create the directory and change the current directory for all future commands to this directory.

### Copy All The Things!

``` Dockerfile
COPY . .
```

The next step is to copy over the files needed to build the image. The command above copies the contents of the current directory to the current working directory in the image. 

**Note both periods at the end of the command and the spacing. It is _very_ easy to miss.**

### Prepare for Entry!

``` Dockerfile
ENTRYPOINT [ "dotnet", "run", "--urls", "http://0.0.0.0:5000" ]
```

This line tells the image it's default startup command. Once all of the setup is complete, this command will be run (with any parameters that you specify). 

### That's it?!

Yup, that's it. Well, almost! So here is the complete `Dockerfile`:

``` Dockerfile
FROM microsoft/dotnet:2.2-sdk

WORKDIR /app
COPY . .

ENTRYPOINT [ "dotnet", "run", "--urls", "http://0.0.0.0:5000" ]
```
 
Now all we have to do is build the image by running the command:

``` bash
dotnet build -t {image-name} .
```

**Note the period at the end of the command. It is _very_ easy to miss.**

Just replace the `{image-name}` with a tag/name that describes your image then watch the command output scroll by as your image successfully build! Next we want to run the new _shiny_ image to create a container.

``` bash
docker run --rm -it -p 5000:5000 --name {container-name} {image-name}
```

This last command looks a lot more complicated than it actually is. It's purpose is to take the image that you just built, and run it as your container. I included the flags/options because they are the most common that I use. They are:
  - _-p_ : Map port
    - This is a web API so it will be accessible via a port via HTTP. Since the container is self-contained, we have to tell it to map it's local port to the host (your machine). I am using port 5000 because it is the default for the .NET project being used. If you would like the change the port on your machine (the Docker host) change the port number on the left of the `:` to your port of choice.
  - _-it_ : Interactive Mode!
    - Personally, I like seeing the console output of an application as it runs. This flag allows that, but will claim control of the current terminal/command window until the container is stopped (CTRL+C). Technically both the _i_ and the _t_ are two separate flags, but in this use-case they should be used together. 
    - If you don't want to see the output or just want to retain control of the current window the _-d_ command can be used to enter _detached_ mode. To stop the container in detached mode, you will need to run `docker stop {container-name}`.
  - _--name_ : This sets the name of the container. This flag is completely optional, but makes things easier if you are running your container in _detached_ mode. If you forget this value or don't set it just run `docker ps` or `docker container list` to see all running containers.
  - _--rm_ : Remove the container after it exits
    - This is a housekeeping issue for me. Untagged images will be given a unique container tag name each time they are built. Each of these containers takes up space, so I like to destroy them once I'm finished. Since we are tagging the image here, this isn't strictly necessary.

Now open a web browser and navigate to `http://localhost:5000/swagger`. Now you have a running container with an application running inside of it.

**_Flawless Victory!_**

### Resources

 - [Demo App](https://github.com/DillonAd/simple-api)
 - [Docker Download](https://www.docker.com/products/docker-desktop)
 - [Docker Hub](https://hub.docker.com)