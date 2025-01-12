IMAGE_VERSION := 4

.DEFAULT_GOAL := run

.PHONY: run
run:
	docker run --rm -it -v $(PWD):/srv/jekyll -p 4000:4000 jekyll/jekyll:${IMAGE_VERSION} jekyll serve --watch

.PHONY: maintain
maintain:
	docker run --rm -it -v $(PWD):/srv/jekyll -p 4000:4000 jekyll/jekyll:${IMAGE_VERSION} bash

.PHONY: update
update:
	docker run --rm -it -v $(PWD):/srv/jekyll -p 4000:4000 jekyll/jekyll:${IMAGE_VERSION} bundler update
