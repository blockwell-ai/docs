<template>
    <div>
        <main class="home" aria-labelledby="main-title">
            <header class="hero">
                <img v-if="data.heroImage"
                     :src="$withBase(data.heroImage)"
                     :alt="data.heroAlt || 'hero'">

                <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>

                <p class="description">
                    {{ data.tagline || $description || 'Welcome to your VuePress site' }}
                </p>

                <p class="action"
                   v-if="data.actionText && data.actionLink">
                    <NavLink class="action-button"
                             :item="actionLink"/>
                </p>
            </header>

            <p class="features-description">
                Select one of the systems below to learn more about each one, or use the main navigation.
            </p>

            <div class="features" v-if="data.features && data.features.length">
                <div class="feature"
                     v-for="(feature, index) in data.features"
                     :key="index">

                    <a :href="feature.link">
                        <div class="feature-icon-wrap">
                            <img v-if="feature.icon" :src="feature.icon">
                        </div>
                        <div class="heading-wrap">
                            <h4>{{ feature.title }}</h4>
                        </div>
                        <p>
                            {{ feature.details }}
                        </p>
                    </a>
                </div>
            </div>

            <Content class="theme-default-content custom"/>
        </main>
        <BlockwellFooter />
    </div>
</template>

<script>
    import NavLink from '@theme/components/NavLink.vue'
    import BlockwellFooter from "@theme/components/BlockwellFooter";

    export default {
        components: {NavLink, BlockwellFooter},

        computed: {
            data() {
                return this.$page.frontmatter
            },

            actionLink() {
                return {
                    link: this.data.actionLink,
                    text: this.data.actionText
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/config';
    @import "~@material/elevation/mdc-elevation";

    .home {
        padding: $navbarHeight 2rem 0;
        max-width: 960px;
        margin: 0 auto;
        display: block;

        .hero {
            text-align: center;

            img {
                max-width: 100%;
                max-height: 280px;
                display: block;
                margin: 3rem auto 1.5rem;
            }

            h1 {
                font-size: 3rem;
            }

            h1, .description, .action {
                margin: 1.8rem auto;
            }

            .description {
                font-size: 1.6rem;
                line-height: 1.3;
                color: $dark;
            }

            .action-button {
                display: inline-block;
                font-size: 1.2rem;
                color: #fff;
                background-color: $accentColor;
                padding: 0.8rem 1.6rem;
                border-radius: 4px;
                transition: background-color 0.1s ease;
                box-sizing: border-box;
                border-bottom: 1px solid darken($accentColor, 10%);

                &:hover {
                    background-color: lighten($accentColor, 10%);
                }
            }
        }

        .features-description {
            font-size: 18px;
            text-align: center;
        }

        .features {
            border-top: 1px solid $borderColor;
            padding: 30px 0;
            margin-top: 2.5rem;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            align-content: stretch;
            justify-content: space-around;
        }

        .feature {
            flex-grow: 1;
            flex-basis: 30%;
            max-width: 30%;
            margin-bottom: 16px;

            a {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                text-decoration: none;
                color: $dark;
                padding: 10px;
                transition: all 0.4s ease;

                &:hover {
                    @include mdc-elevation(4, #666);
                    background: #fdfdff;
                }

                .feature-icon-wrap {
                    width: 52px;
                    height: 52px;
                    margin: 24px 0;
                    display: flex;

                    img {
                        display: block;
                        vertical-align: center;
                        max-width: 100%;
                        max-height: 100%;
                    }
                }

                .heading-wrap {
                    min-height: 72px;
                }

                h4 {
                    font-size: 28px;
                    margin: 16px 0 8px;
                }

                p {
                    margin-top: 0;
                }
            }
        }

        .footer {
            padding: 2.5rem;
            border-top: 1px solid $borderColor;
            text-align: center;
            color: lighten($textColor, 25%);
        }
    }

    @media (max-width: $MQMobile) {
        .home {
            .features {
                flex-direction: column;
            }

            .feature {
                max-width: 100%;
                width: 100%;
                padding: 0 1rem;
            }
        }
    }

    @media (max-width: $MQMobileNarrow) {
        .home {
            padding-left: 1.5rem;
            padding-right: 1.5rem;

            .hero {
                img {
                    max-height: 210px;
                    margin: 2rem auto 1.2rem;
                }

                h1 {
                    font-size: 2rem;
                }

                h1, .description, .action {
                    margin: 1.2rem auto;
                }

                .description {
                    font-size: 1.2rem;
                }

                .action-button {
                    font-size: 1rem;
                    padding: 0.6rem 1.2rem;
                }
            }

            .feature {
                h2 {
                    font-size: 1.25rem;
                }
            }
        }
    }

</style>
