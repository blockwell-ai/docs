.PHONY: build run

build:
	npm run build

deploy: build
	rsync -avzc docs/.vuepress/dist/ blockwell.ai:/var/www/docs.blockwell.ai --exclude 'apiminer/api' --delete-after

skaffold:
	skaffold run -n static
