<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

        <router-link :to="$localePath"
                     class="home-link">
            <img class="logo"
                 ref="logo"
                 v-if="$site.themeConfig.logo"
                 :src="$withBase($site.themeConfig.logo)"
                 :alt="$siteTitle">

            <span ref="siteName"
                  class="site-name">
              Docs
            </span>
        </router-link>

        <div
                class="links"
                :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}">
            <SearchBox/>
            <NavLinks class="can-hide"/>
        </div>
    </header>
</template>

<script>
    import SearchBox from '@SearchBox'
    import SidebarButton from '@theme/components/SidebarButton.vue'
    import NavLinks from '@theme/components/NavLinks.vue'

    export default {
        components: {SidebarButton, NavLinks, SearchBox},

        data() {
            return {
                linksWrapMaxWidth: null
            }
        },

        mounted() {
            const MOBILE_DESKTOP_BREAKPOINT = 705; // refer to config.styl
            const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'));
            const handleLinksWrapWidth = () => {
                if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
                    this.linksWrapMaxWidth = null
                } else {
                    this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
                        - (this.$refs.siteName.offsetWidth + this.$refs.logo.offsetWidth)
                }
            };
            handleLinksWrapWidth();
            window.addEventListener('resize', handleLinksWrapWidth, false)
        }
    }

    function css(el, property) {
        // NOTE: Known bug, will return 'auto' if style value is 'auto'
        const win = el.ownerDocument.defaultView;
        // null means not to return pseudo styles
        return win.getComputedStyle(el, null)[property]
    }
</script>

<style lang="scss">
    @import '../styles/config';

    $navbar-vertical-padding: 0.7rem;
    $navbar-horizontal-padding: 1.5rem;

    .navbar {
        padding: $navbar-vertical-padding $navbar-horizontal-padding;
        line-height: $navbarHeight - 1.4rem;
        display: flex;
        align-items: center;

        & > a {
            display: flex;
            align-items: center;
        }

        .logo {
            margin-right: 0.8rem;
            vertical-align: middle;
        }

        .site-name {
            font-size: 1.3rem;
            font-weight: 600;
            position: relative;
        }

        .links {
            padding-left: 1.5rem;
            box-sizing: border-box;
            white-space: nowrap;
            font-size: 0.9rem;
            position: absolute;
            right: $navbar-horizontal-padding;
            top: $navbar-vertical-padding;
            display: flex;

            .search-box {
                flex: 0 0 auto;
                vertical-align: top;
            }
        }
    }

    @media (max-width: $MQMobile) {
        .navbar {
            padding-left: 4rem;

            .can-hide {
                display: none;
            }

            .links {
                padding-left: 1.5rem;
            }

            .site-name {
                width: calc(100vw - 9.4rem);
                font-size: 1.1rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }

</style>
