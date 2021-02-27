import pageComponents from '@internal/page-components';

export default ({ Vue, options, router, siteData }) => {
    for (const [name, component] of Object.entries(pageComponents)) {
        Vue.component(name, component)
    }
    Vue.config.ignoredElements = [
        'asciinema-player'
    ];
}
