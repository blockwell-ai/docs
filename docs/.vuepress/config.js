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
        }]
    ],
    markdown: {
        extendMarkdown: md => {
            md.use(require('../../plugins/markdown-it-responsive-video'));
            md.use(require('markdown-it-katex'));
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
                        ['https://apidocs.apiminer.com', 'API Miner API Specification']
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
                        ['ssh-key', 'Creating SSH Keys'],
                        ['https://bw.blockwell.ai', 'bw Server Access']
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
                        'prime'
                    ]
                },
                {
                    title: 'Others',
                    collapsable: false,
                    children: [
                        'daico'
                    ]
                }
            ]
        },
        nav: [
            {
                text: 'Guides',
                items: [
                    {text: 'Blockwell-QR', link: '/qr/getting-started'},
                    {text: 'API Miner Quickstart', link: '/apiminer/quickstart/'},
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
                            {text: 'Prime', link: '/contracts/prime'}
                        ]
                    },
                    {
                        text: 'Other Contracts', items: [
                            {text: 'Daico', link: '/contracts/daico'}
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
    }
};
