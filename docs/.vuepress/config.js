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
        ]
    ],
    markdown: {
        extendMarkdown: md => {
            md.use(require('../../plugins/markdown-it-responsive-video'));
        }
    },
    themeConfig: {
        logo: '/logo-horizontal.png',
        sidebar: {
            '/apiminer/': [
                {
                    title: 'API Miner',
                    collapsable: false,
                    children: [
                        '',
                        ['quickstart', 'Quickstart'],
                        'conventions',
                        'callbacks',
                        'networks'
                    ]
                },
                {
                    title: 'Videos',
                    collapsable: false,
                    children: [
                        'curl-video',
                        'postman-video'
                    ]
                },
                {
                    title: 'Links',
                    collapsable: false,
                    children: [
                        ['https://docs.blockwell.ai/apiminer/api', 'API Miner API Specification']
                    ]
                }
            ],
            '/bw/': [
                {
                    title: 'bw',
                    collapsable: false,
                    children: [
                        '',
                        'getting-started',
                        'configuration',
                        'build-file'
                    ]
                },
                {
                    title: 'Commands',
                    collapsable: false,
                    children: [
                        'global-options',
                        'commands'
                    ]
                },
                {
                    title: 'bw Server',
                    collapsable: false,
                    children: [
                        ['ssh-key', 'Creating SSH Keys']
                    ]
                },
                {
                    title: 'Videos',
                    collapsable: false,
                    children: [
                        ['demo', 'bw Demonstration']
                    ]
                }
            ],
            '/qr/': [
                {
                    title: 'Blockwell-QR',
                    collapsable: false,
                    children: [
                        '',
                        'blockwell-wallet'
                    ]
                },
                {
                    title: 'Getting Started',
                    collapsable: false,
                    children: [
                        'getting-started',
                        'getting-started-android',
                        'getting-started-web'
                    ]
                },
                'voting',
                'creating-qr',
                {
                    title: 'Videos',
                    collapsable: false,
                    children: [
                        'payment-video'
                    ]
                }
            ],
            '/contracts/': [
                {
                    title: 'Smart Contracts',
                    collapsable: false,
                    children: [
                        '',
                        'blockwell-contracts'
                    ]
                },
                {
                    title: 'Tokens',
                    collapsable: false,
                    children: [
                        'prime',
                        'community',
                        'forum',
                        'ego'
                    ]
                },
                {
                    title: 'Others',
                    collapsable: false,
                    children: [
                        'daico',
                        'itemdrops',
                        'suggestions',
                        'quill',
                        'data-strings',
                        'blockwell-roar'
                    ]
                }
            ]
        },
        nav: [
            {
                text: 'Guides',
                items: [
                    {text: 'Blockwell-QR', link: '/qr/getting-started'},
                    {text: 'API Miner Quickstart', link: '/apiminer/quickstart'},
                    {text: 'Getting Started with bw', link: '/bw/getting-started'},
                    {text: 'Using Daico', link: '/contracts/daico#using-daico'}
                ]
            },
            {
                text: 'Tools',
                items: [
                    {text: 'API Miner', link: '/apiminer/'},
                    {text: 'bw', link: '/bw/'}
                ]
            },
            {
                text: 'Smart Contracts',
                items: [
                    {text: "Introduction", link: '/contracts/'},
                    {
                        text: 'ERC-20 Tokens', items: [
                            {text: 'Prime', link: '/contracts/prime'},
                            {text: 'Community Token', link: '/contracts/community'},
                            {text: 'Forum Token', link: '/contracts/forum'},
                            {text: 'Ego Coin', link: '/contracts/ego'},
                        ]
                    },
                    {
                        text: 'Other Contracts', items: [
                            {text: 'Daico', link: '/contracts/daico'},
                            {text: 'Item Drops / Lotto', link: '/contracts/itemdrops'},
                            {text: 'Suggestions', link: '/contracts/suggestions'},
                            {text: 'Quill', link: '/contracts/quill'},
                            {text: 'Data Strings', link: '/contracts/data-strings'},
                            {text: 'Blockwell Roar', link: '/contracts/blockwell-roar'},
                        ]
                    }
                ]
            },
            {
                text: 'Blockwell-QR',
                link: '/qr/'
            },
            {
                text: 'Blockwell',
                link: 'https://blockwell.ai'
            }
        ]
    },
    head: [
        ['script', {async: 'async', src: 'https://www.googletagmanager.com/gtag/js?id=UA-125261381-4'}],
        ['script', {}, `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-125261381-4');`]
    ]
};
