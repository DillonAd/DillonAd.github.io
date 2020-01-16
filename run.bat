@ECHO OFF

docker run --rm -it -v "%cd%":/srv/jekyll -p 4000:4000 jekyll/jekyll jekyll serve --watch