import pageComponents from '@internal/page-components';

export default ({ Vue, options, router, siteData }) => {
    for (const [name, component] of Object.entries(pageComponents)) {
        Vue.component(name, component)
    }
    Vue.config.ignoredElements = [
        'asciinema-player'
    ];

    router.addRoutes([
        {
            path: '/contracts/lotto.html',
            redirect: '/contracts/lotto/'
        }
    ])

    router.options.scrollBehavior = (to, from, savedPosition) => {
        if (savedPosition) {
            return window.scrollTo({
                top: savedPosition.y,
                behavior: 'smooth',
            });
        }
        else if (to.hash) {
            const targetElement = document.querySelector(to.hash);
            if (targetElement) {
                const y = targetElement.getBoundingClientRect().top + window.scrollY - 80;
                return window.scrollTo({
                    top: y,
                    behavior: 'smooth',
                });
            }
        }
        else {
            return window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };
}
