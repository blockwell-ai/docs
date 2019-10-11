.PHONY: build run

build:
	npm run build

deploy: build
	rsync -avz docs/.vuepress/dist/ blockwell.ai:/var/www/docs
