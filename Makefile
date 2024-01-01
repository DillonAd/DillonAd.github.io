.DEFAULT_GOAL := run

.PHONY: run
run:
	docker run --rm -it -v $(PWD):/srv/jekyll -p 4000:4000 jekyll/jekyll:3 jekyll serve --watch

.PHONY: maintain
maintain:
	docker run --rm -it -v $(PWD):/srv/jekyll -p 4000:4000 jekyll/jekyll:3 bash
