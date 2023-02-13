<template>
    <aside class="sidebar">
        <NavLinks extra-class="mobile-nav" no-collapse mobile/>
        <slot name="top"/>
        <NavLinks extra-class="desktop-nav" no-collapse/>
        <slot name="bottom"/>
    </aside>
</template>

<script>
    import SidebarLinks from '@theme/components/SidebarLinks.vue'
    import NavLinks from '@theme/components/NavLinks.vue'

    export default {
        name: 'Sidebar',

        components: {SidebarLinks, NavLinks},

        props: ['items']
    }
</script>

<style lang="scss">
    @import "../styles/config";

    .sidebar {
        ul {
            padding: 0;
            margin: 0;
            list-style-type: none;
        }

        a {
            display: inline-block;
        }

        .nav-links {
            width: 100%;
            padding: 1.5rem 0 0.75rem 0;

            a {
                font-weight: 600;
            }

            .nav-item, .repo-link {
                display: block;
                line-height: 1.25rem;
                font-size: 1.1em;
                padding: 0.5rem 0 0.5rem;
                margin: 0;
            }

            &.mobile-nav {
                display: none;
            }

            .dropdown-title > a {
                padding-left: 1.25rem;
                border-left: 4px solid transparent;
                box-sizing: border-box;
                width: 100%;
                &.router-link-exact-active {
                    font-weight: 600;
                    color: $accentColor;
                    border-left-color: $accentColor;
                }
            }

            .dropdown-item > a {
                font-size: 15px;
                line-height: 2rem;
                box-sizing: border-box;
                width: 100%;
                padding-left: 2rem;
                font-weight: normal;
                border-left: 4px solid transparent;

                &:hover {
                    color: $accentColor;
                }

                &.router-link-active {
                    font-weight: 600;
                    color: $accentColor;
                    border-left-color: $accentColor;
                }
            }

            .dropdown-item > h4 {
                font-size: 16px;
                padding-left: 1.25rem;
                margin-top: 14px;
                margin-bottom: 8px;
                font-weight: 200;
                color: #666;
            }

            .dropdown-subitem >a {
                font-size: 15px;
                line-height: 2rem;
                box-sizing: border-box;
                width: 100%;
                padding-left: 2rem;
                font-weight: normal;
                border-left: 4px solid transparent;

                &:hover {
                    color: $accentColor;
                }

                &.router-link-active {
                    font-weight: 600;
                    color: $accentColor;
                    border-left-color: $accentColor;
                }
            }

            .dropdown-sublist .dropdown-subitem > a {
                padding-left: 3.25rem;
                font-size: 13px;
            }

            .dropdown-subsubitem a {
              padding-left: 3.25rem;
              font-size: 13px;
              border-left: 4px solid transparent;
              font-weight: normal;
              &:hover {
                color: $accentColor;
              }

              &.router-link-active {
                font-weight: 600;
                color: $accentColor;
                border-left-color: $accentColor;
              }
            }

          .dropdown-subsubitem-wrapper.l2 {
            .dropdown-subsubitem a {
              padding-left: 4rem;
              font-size: 13px;
              font-weight: normal;
              color: #333;
              border-left: none;
                &:hover {
                    color: $accentColor;
                }

              &.router-link-active {
                font-weight: 600;
                color: $accentColor;
                border-left-color: $accentColor;
              }
            }
          }

            .nav-item > .external {
                padding-left: 1.25rem;
            }
        }

        & > .sidebar-links {
            padding: 1.5rem 0;

            & > li > a.sidebar-link {
                font-size: 1.1em;
                line-height: 1.7;
                font-weight: bold;
            }

            & > li:not(:first-child) {
                margin-top: 0.75rem;
            }
        }
    }

    @media (max-width: $MQMobile) {
        .sidebar {
            .nav-links .dropdown-item > h4 {
                font-size: 1rem;
                padding-left: 36px;
            }

            .nav-links.desktop-nav {
                display: none;
            }

            .nav-links.mobile-nav {
                display: block;

                .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-exact-active::after {
                    top: calc(1rem - 2px);
                }
            }

            & > .sidebar-links {
                padding: 1rem 0;
            }
        }
    }

</style>
