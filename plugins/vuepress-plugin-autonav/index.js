/*

Modified From: https://github.com/webmasterish/vuepress-plugin-autonav

MIT License

Copyright (c) 2019 webmasterish

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */

const PATH = require('path');
const _ = {
    defaultsDeep: require('lodash.defaultsdeep'),
    isEmpty: require('lodash.isempty'),
    orderBy: require('lodash.orderby'),
    isEqual: require('lodash.isequal')
};

/**
 * holds relevant functions and data
 */
const PLUGIN = {
    name: 'autonav' // the would also be the key used in frontmatter
};

/**
 * @return {object}
 */
PLUGIN.get_options_defaults = () => {
    return {
        enable: true, // enables/disables everything - control per page using frontmatter
        group: null,
        groupOrder: null
    };
};

/**
 * @return {object}
 */
PLUGIN.get_page_options = (page, plugin_options) => {
    const {frontmatter} = page;

    // order of options override:
    // - defaults				-> gets set in this file by `PLUGIN.get_default_options()`
    // - plugin options	-> gets set in `config.js`
    // - frontmatter		-> gets set in each page
    const options = _.defaultsDeep(
        frontmatter[PLUGIN.name],
        plugin_options,
        PLUGIN.get_options_defaults()
    );

    return options;
};

function sort_items(items) {
    return _.orderBy(items, ['order', 'text'], ['asc', 'asc']);
}

/**
 * @return {array}
 */
PLUGIN.get_auto_nav_items = async (pages, plugin_options) => {
    const items = [];
    for (const page of pages) {
        const page_options = PLUGIN.get_page_options(page, plugin_options);

        if (!page_options.enable) {
            continue;
        }

        const {title, path} = page;

        if (!path) {
            continue;
        }

        const text = page_options.text || title;
        const link = path;
        const order = page_options.order || 0;
        const group = page_options.group;
        const groupOrder = page_options.groupOrder;

        if (text && link) {
            const parse_path = PATH.parse(path);
            const parent = (parse_path.root === parse_path.dir) ? false : parse_path.dir;
            const item = {text, link, order, parent, group, groupOrder, level: link.split('/').filter(it => it).length};
            items.push(item);
        }
    }

    if (_.isEmpty(items)) {
        return;
    }

    for (let item of items.filter(it => it.parent)) {
        let parent = items.find(it => it.link === item.parent + '/');
        if (parent) {
            if (!parent.items) {
                parent.items = [];
            }
            if (item.group) {
                let group = parent.items.find(it => it.text === item.group);
                if (!group) {
                    group = {text: item.group, items: [], grouping: true};
                    parent.items.push(group);
                }
                if (item.groupOrder) {
                    if (group.order && group.order !== item.groupOrder) {
                        throw new Error(`Conflicting group order found in '${item.text}'`);
                    }
                    group.order = item.groupOrder;
                }
                group.items.push(item);
            } else {
                parent.items.push(item);
            }
        }
    }

    let parents = items.filter(it => !it.parent);

    for (let parent of parents) {
        if (parent.items) {
            for (let group of parent.items) {
                if (group.items) {
                    if (!group.order) {
                        group.order = 1;
                    }
                    group.items = sort_items(group.items);
                }
            }
            parent.items = sort_items(parent.items);
        }
    }

    return parents;
};

// -----------------------------------------------------------------------------

module.exports = (plugin_options, context) => ({

    async ready() {
        const options = _.defaultsDeep(
            plugin_options,
            PLUGIN.get_options_defaults()
        );
        if (!options.enable) {
            return;
        }
        const {pages, themeConfig} = context.getSiteData ? context.getSiteData() : context;

        if (_.isEmpty(pages)) {
            return;
        }

        const nav_items = (themeConfig.nav || []).concat(await PLUGIN.get_auto_nav_items(pages, plugin_options));
        if (_.isEmpty(nav_items)) {
            return;
        }
        themeConfig.nav = sort_items(nav_items);
    }
});
