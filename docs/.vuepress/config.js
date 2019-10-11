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
            md.use(require('../../plugins/markdown-it-responsive-video'))
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
                        'callbacks'
                    ]
                },
                {
                    title: 'Videos',
                    collapsable: false,
                    children: [
                        'curl-video',
                        'postman-video'
                    ]
                }
            ],
            '/qr/': [
                '',
                {
                    title: 'Videos',
                    collapsable: false,
                    children: [
                        'payment-video'
                    ]
                }
            ],
            '/contracts/': [
                '/contracts/',
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
                    {text: 'API Miner Quickstart', link: '/apiminer/quickstart/'},
                    {text: 'Using Daico', link: '/daico/'}
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
