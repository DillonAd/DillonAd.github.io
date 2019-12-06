---
layout: post
title: Testing GitHub Pages Locally 
category: [ testing, local, github pages ]
tags: [ testing, local, github pages, docker ]
date: 2019-12-05
---
Something has always bothered me about deploying something that I haven't tested locally. A big manifestation of this is my blog. Since my blog is currently hosted on GitHub Pages, I needed [Jekyll](https://jekyllrb.com/) and all of its dependencies. Since those aren't things I typically have installed, so I decided to use a piece of software I always install: Docker.

The whole ordeal managed to come out to a single line:

_Linux_
```sh
docker run --rm -it -v $(pwd):/srv/jekyll -p 4000:4000 jekyll/jekyll jekyll serve --watch
```

_Windows_

```sh
docker run --rm -it -v "%cd%":/srv/jekyll -p 4000:4000 jekyll/jekyll jekyll serve --watch
```
_Note the double quotes since Windows paths can have spaces_

This command should be run in the root of your GitHub Pages project. It will create a Jekyll container that is listening to the current directory for changes and is exposed via port `4000`. This way as you edit either blog content or site styling the changes appear as quickly as the site refreshes in your browser.