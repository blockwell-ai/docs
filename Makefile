.PHONY: build run

build:
	npm run build

deploy: build
	rsync -avzc docs/.vuepress/dist/ blockwell.ai:/var/www/docs

deploy-prod:
	rsync -avzc docs/.vuepress/dist/ jenkins@blockwell.ai:/var/www/docs
