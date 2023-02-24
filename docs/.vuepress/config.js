module.exports = {
    title: 'Blockwell Docs',
    description: 'Official documentation for Blockwell systems',
    scss: {
        sassOptions: {
            includePaths: ['./node_modules']
        }
    },
    plugins: [
        ['vuepress-plugin-code-copy', {
            color: '#eeeeee'
        }],
        ['vuepress-plugin-container', {
            type: 'detail',
            defaultTitle: {
                '/': "IF YOU'RE CURIOUS",
                '/zh/': '提示'
            }
        }],
        ['vuepress-plugin-container', {
            type: 'example',
            defaultTitle: {
                '/': "EXAMPLE",
                '/zh/': '提示'
            }
        }],
        [
            'vuepress-plugin-mathjax',
            {
                target: 'svg'
            }
        ],
        require('../../plugins/vuepress-plugin-autonav')
    ],
    markdown: {
        extendMarkdown: md => {
            md.use(require('../../plugins/markdown-it-responsive-video'));

            const pattern = /!([a-z][a-z0-9]*)$/i;
            md.use((md) => {
                const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
                    return self.renderToken(tokens, idx, options);
                };

                md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
                    let link = tokens[idx];
                    let href;
                    let hrefIndex = link.attrIndex('href')
                    if (hrefIndex >= 0) {
                        href = link.attrs[hrefIndex][1];

                        let match = pattern.exec(href);
                        if (match) {
                            let type = match[1].toLowerCase();
                            let addClass;
                            switch (type) {
                                case 'button':
                                    addClass = ' btn btn-sm btn-primary';
                                    break;
                            }

                            if (addClass) {
                                link.attrs[hrefIndex][1] = href.replace(pattern, '');

                                let classIndex = link.attrIndex('class');

                                if (classIndex < 0) { // attr doesn't exist, add new attribute
                                    link.attrPush(['class', addClass])
                                } else {
                                    link.attrs[classIndex][1] += addClass;
                                }
                            }
                        }
                    }

                    // pass token to default renderer.
                    return defaultRender(tokens, idx, options, env, self)
                }
            })
        }
    },
    themeConfig: {
        logo: '/logo-horizontal.png',
        nav: [
            {
                text: 'Blockwell',
                link: 'https://blockwell.ai',
                order: 10
            }
        ]
    },
    head: [
        ['script', {async: 'async', src: 'https://www.googletagmanager.com/gtag/js?id=UA-125261381-4'}],
        ['script', {}, `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-125261381-4');`]
    ],
    mounted() {
        const hash = document.location.hash;
        if (hash.length > 1) {
            const id = hash.substring(1)
            const element = document.getElementById(id)
            if (element) {
                const y = element.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }
    }
};
