---
layout: default
title: About Me
---
{% assign today = 'now' | date: '%s' %}
{% assign start = '01-05-2011 08:00:00' | date: '%s' %}
{% assign secondsSince = today | minus: start %}
{% assign yearsSince = secondsSince | divided_by: 60 | divided_by: 60 | divided_by: 24 | divided_by: 365 %}

<img src="{{ site.github.owner.avatar_url }}" class="me" alt="My Picture" /> 

Hello! My name is Dillon and I am a software engineer currently located in Tulsa, Oklahoma. I have been working in technology for {{ yearsSince }} years. I have worked in multiple industries such as e-commerce, health insurance, oil and gas, and most recently consulting. Most of my experience has been using C# (.NET Framework /.NET Core) and JavaScript, but I am always excited to learn a new language. I am passionate about creating awesome software and enabling fellow engineers to be as productive as possible. 

Recently I have been having a blast diving into Linux, Docker, Kubernetes, Golang, and NodeJS. I have also been trying to practice my writing skills by adding to this blog!

Outside of tech, I enjoy riding my bicycle, reading books, and playing puzzle/strategy games with friends.