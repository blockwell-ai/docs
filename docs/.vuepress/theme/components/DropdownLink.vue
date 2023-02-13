<template>
    <div
        class="dropdown-wrapper"
        :class="{ isOpen }">
        <div class="dropdown-title"
             :aria-label="dropdownAriaLabel">

            <NavLink :item="item"/>
            <span v-if="!noCollapse"
                  class="arrow"
                  :class="isOpen ? 'down' : 'right'"
                  @click="setOpen(!open)"
            ></span>
        </div>

        <component :is="dropdownTag">
            <ul class="nav-dropdown"
                v-show="isOpen">

                <li class="dropdown-item"
                    :class="subItem.grouping ? 'dropdown-grouping' : 'dropdown-sublist'"
                    :key="subItem.link || index"
                    v-for="(subItem, index) in item.items">

                    <NavLink v-if="!subItem.items || !subItem.grouping"
                             @focusout="isLastItemOfArray(subItem, item.items) && setOpen(false)"
                             :item="subItem" />
                    <h4 v-else>{{ subItem.text }}</h4>

                    <ul class="dropdown-subitem-wrapper"
                        v-if="subItem.items">
                        <li class="dropdown-subitem"
                            :key="childSubItem.link"
                            v-for="childSubItem in subItem.items">
                            <NavLink @focusout="
                                      isLastItemOfArray(childSubItem, subItem.items) &&
                                      isLastItemOfArray(subItem, item.items) &&
                                      setOpen(false)
                                    "
                                     :item="childSubItem"/>
                            <ul class="dropdown-subsubitem-wrapper l1"
                                v-if="childSubItem.items">
                                <li class="dropdown-subsubitem"
                                    v-for="subSubItem in childSubItem.items"
                                    :key="subSubItem.link">
                                    <NavLink @focusout="
                                      isLastItemOfArray(subSubItem, childSubItem.items) &&
                                      isLastItemOfArray(childSubItem, subItem.items) &&
                                      isLastItemOfArray(subItem, item.items) &&
                                      setOpen(false)
                                    "
                                             :item="subSubItem"/>
                                </li>
                            </ul>
                            <ul class="dropdown-subsubitem-wrapper l2"
                                v-else-if="childSubItem.headers && isActive($route, childSubItem.link)">
                                <li class="dropdown-subsubitem"
                                    v-for="header in childSubItem.headers"
                                    v-if="header.level === 2"
                                    :key="header.slug">
                                    <NavLink
                                             :item="{link: childSubItem.link + '#' + header.slug, text: header.title}"/>

                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul v-else-if="subItem.headers && isActive($route, subItem.link)" class="dropdown-subitem-wrapper">

                        <ul class="dropdown-subsubitem-wrapper l2">
                            <li class="dropdown-subsubitem"
                                v-for="header in subItem.headers"
                                v-if="header.level === 2"
                                :key="header.slug">
                                <NavLink
                                    :item="{link: subItem.link + '#' + header.slug, text: header.title}"/>

                            </li>
                        </ul>
                    </ul>
                </li>
            </ul>
        </component>
    </div>
</template>

<script>
    import NavLink from '@theme/components/NavLink.vue'
    import DropdownTransition from '@theme/components/DropdownTransition.vue'
    import {isActive} from "@theme/util/index";
    import last from 'lodash/last'

    export default {
        components: {NavLink, DropdownTransition},

        data() {
            return {
                open: false
            }
        },

        props: {
            item: {
                required: true
            },
            noCollapse: {
                type: Boolean,
                default: false
            }
        },

        computed: {

            dropdownAriaLabel() {
                return this.item.ariaLabel || this.item.text
            },
            dropdownTag() {
                return this.noCollapse ? 'div' : DropdownTransition
            },
            isOpen() {
                if (this.noCollapse) {
                    return true;
                }
                return this.open;
            }
        },

        methods: {
            setOpen(value) {
                this.open = value
            },

            isLastItemOfArray(item, array) {
                return last(array) === item
            },
            isActive
        },

        watch: {
            $route() {
                this.open = false
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/config';

    .navbar {
        .dropdown-wrapper {
            cursor: pointer;

            .dropdown-title {
                display: block;
                font-size: 0.9rem;
                font-family: inherit;
                cursor: inherit;
                padding: inherit;
                line-height: 1.4rem;
                background: transparent;
                border: none;
                font-weight: 600;
                color: $white;

                &:hover {
                    border-color: transparent;
                }

                .arrow {
                    vertical-align: middle;
                    margin-top: -1px;
                    margin-left: 0.4rem;
                }
            }

            .nav-dropdown {
                color: $dark;

                .dropdown-item {
                    color: inherit;
                    line-height: 1.7rem;

                    h4 {
                        margin: 0.45rem 0 0;
                        border-top: 1px solid #eee;
                        padding: 0.45rem 1.5rem 0 1.25rem;
                    }

                    .dropdown-subitem-wrapper {
                        padding: 0;
                        list-style: none;

                        .dropdown-subitem {
                            font-size: 0.9em;
                        }
                    }

                    a {
                        display: block;
                        line-height: 1.7rem;
                        position: relative;
                        border-bottom: none;
                        font-weight: 400;
                        margin-bottom: 0;
                        padding: 0 1.5rem 0 1.25rem;

                        &:hover {
                            color: $accentColor;
                        }

                        &.router-link-exact-active {
                            color: $accentColor;

                            &::after {
                                content: "";
                                width: 0;
                                height: 0;
                                border-left: 5px solid $accentColor;
                                border-top: 3px solid transparent;
                                border-bottom: 3px solid transparent;
                                position: absolute;
                                top: calc(50% - 2px);
                                left: 9px;
                            }
                        }
                    }

                    .dropdown-subsubitem-wrapper {
                        margin-bottom: 10px;
                    }

                  .dropdown-subsubitem-wrapper.l2 {
                    .dropdown-subsubitem {
                      list-style-type: none;

                      a {
                        color: #555;

                          &:hover {
                              color: $accentColor;
                          }
                      }
                    }
                  }

                    &:first-child h4 {
                        margin-top: 0;
                        padding-top: 0;
                        border-top: 0;
                    }
                }
            }
        }
    }

    .sidebar {
        .dropdown-wrapper {
            &.isOpen .dropdown-title {
                margin-bottom: 0.5rem;
            }

            .dropdown-title {
                font-weight: 600;
                font-size: inherit;
                color: $dark;

                &:hover {
                    color: $accentColor;
                }
            }

        }
    }

    .navbar {
        .dropdown-wrapper {
            height: 1.8rem;

            &:hover .nav-dropdown,
            &.isOpen .nav-dropdown {

                display: block !important;
            }

            &.isOpen:blur {
                display: none;
            }

            .dropdown-title .arrow {

                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 6px solid $arrowBgColor;
                border-bottom: 0;
            }

            .nav-dropdown {
                display: none;

                height: auto !important;
                box-sizing: border-box;
                max-height: calc(100vh - 2.7rem);
                overflow-y: auto;
                position: absolute;
                top: 100%;
                right: 0;
                background-color: #fff;
                padding: 0.6rem 0;
                border: 1px solid #ddd;
                border-bottom-color: #ccc;
                text-align: left;
                border-radius: 0.25rem;
                white-space: nowrap;
                margin: 0;
            }
        }
    }

</style>
