<template>
    <div>
        <main :class="classes" aria-labelledby="main-title">
            <header class="hero">
                <img v-if="data.heroImage"
                     :src="$withBase(data.heroImage)"
                     :alt="data.heroAlt || 'hero'">

                <img v-if="data.logo"
                     class="logo-image"
                     :src="$withBase(data.logo)"
                     :alt="data.logoAlt || 'logo'">

                <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>

                <p v-if="data.tagline" class="description">
                    {{ data.tagline }}
                </p>

                <p class="action"
                   v-if="data.actionText && data.actionLink">
                    <NavLink class="action-button"
                             :item="actionLink"/>
                </p>
            </header>

            <p v-if="data.featuresText" class="features-description">
                {{ data.featuresText }}
            </p>

            <div class="theme-default-content custom">
                <Content/>
            </div>
        </main>
        <BlockwellFooter/>
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

        classes() {
            let val = ["home"];
            if (this.$page.frontmatter.wide) {
                val.push('wide');
            }
            if (this.$page.frontmatter.landing) {
                val.push('landing');
            }
            return val.join(' ');
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
@import '../styles/mixins';
@import "~@material/elevation/mdc-elevation";

.home {
    padding: $navbarHeight 0 0;
    display: block;
    max-width: 960px;
    margin: 0 auto;

    &.wide {
        max-width: none;
        margin: 0;
    }

    .hero {
        padding: 0 16px;
        text-align: center;

        img {
            max-width: 100%;
            max-height: 280px;
            display: block;
            margin: 3rem auto 1.5rem;
        }

        .logo-image {
          height: 140px;
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
        padding: 0 16px;
        font-size: 18px;
        text-align: center;
    }

    &.wide .home-section:nth-child(odd) {
        background: $dark url("/bg2.png") top center;
        color: $white;
    }

    .home-section-inner {
        padding: 40px 16px;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;

        .screenshot {
            max-width: 640px;
            margin: 0 auto;
        }

        .header-anchor {
            display: none;
        }

        h1 {
            text-align: center;
        }

        .features {
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                list-style: none;
                padding: 0;

                li {
                    flex: 0 0 220px;
                    margin: 0 0 20px;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    font-size: 15px;
                }

                @media (max-width: $MQMobile) {
                    grid-auto-flow: row;
                    grid-auto-columns: 90%;

                    li {
                        margin: 0 0 40px;
                    }
                }
            }
        }

        .features {
            ul {
                margin: 80px 0 20px;
            }

            li {
                strong {
                    font-size: 24px;
                    margin-bottom: 8px;
                }

                img {
                    display: block;
                    width: 72px;
                    height: 72px;
                    object-fit: contain;
                    margin-bottom: 16px;
                }
            }
        }
    }

    &.landing {
        .home-section-inner .features ul {
            margin-top: 0;
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
