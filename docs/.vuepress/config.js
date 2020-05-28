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
    ]
};
