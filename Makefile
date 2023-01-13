.PHONY: run
run:
	docker run --rm -it -v $(PWD):/srv/jekyll -p 4000:4000 jekyll/jekyll jekyll serve --watch

.PHONY: maintain
maintain:
	docker run --rm -it -v $(PWD):/srv/jekyll -p 4000:4000 jekyll/jekyll bash
