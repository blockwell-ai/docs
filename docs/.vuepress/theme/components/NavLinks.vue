<template>
  <nav
    class="nav-links"
    :class="extraClass"
    v-if="userLinks.length || repoLink"
  >
    <!-- user links -->
    <div
      class="nav-item"
      v-for="item in userLinks"
      :key="item.link"
    >
      <DropdownLink
        v-if="item.items"
        :item="item"
        :no-collapse="noCollapse"
      />
      <NavLink
        v-else
        :item="item"
      />
    </div>

    <!-- repo link -->
    <a
      v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ repoLabel }}
      <OutboundLink/>
    </a>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import { findSubNav } from '../util'
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: { NavLink, DropdownLink },

  props: {
    extraClass: {
      type: String,
      default: ""
    },
    noCollapse: {
      type: Boolean,
      default: false
    },
    mobile: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },

    nav () {
      const { locales } = this.$site;
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const routes = this.$router.options.routes;
        const themeLocales = this.$site.themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
          items: Object.keys(locales).map(path => {
            const locale = locales[path];
            const text = themeLocales[path] && themeLocales[path].label || locale.lang;
            let link;
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        };
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },

    userLinks () {
      let list = JSON.parse(JSON.stringify(this.nav || []));

      // Mobile sidebar
      if (this.mobile) {
        for (let item of list) {
          if (item.items) {
            for (let subitem of item.items) {
              if (subitem.items && !subitem.grouping && !this.$page.path.startsWith(subitem.link)) {
              }
            }
          }
        }
      } else if (this.noCollapse) {
        // Desktop sidebar
        list = findSubNav(list, this.$page);
      } else {
        // Desktop topnav
        for (let item of list) {
          if (item.items) {
            for (let subitem of item.items) {
              if (subitem.items && !subitem.grouping) {
                subitem.items = null;
              }
            }
          }
        }
      }

      return list;
    },

    repoLink () {
      const { repo } = this.$site.themeConfig;
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
      return null
    },

    repoLabel () {
      if (!this.repoLink) return;
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ['GitHub', 'GitLab', 'Bitbucket'];
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/config';

  .nav-links {
    display: inline-block;

    a {
      line-height: 1.4rem;
      color: inherit;
      font-weight: 600;
      &:hover, &.router-link-exact-active {
        color: $primary;
      }
    }
    .nav-item {
      position: relative;
      display: inline-block;
      margin-left: 1.5rem;
      line-height: 2rem;
    }
    .repo-link {
      margin-left: 1.5rem;
    }

    .nav-link.external {
      color: inherit;

      .icon.outbound {
        color: #888888;
      }
    }
  }

  .sidebar .nav-links {

  }

  @media (max-width: $MQMobile) {
    .nav-links {
      .nav-item, .repo-link {
        margin-left: 0;
      }


      .nav-link.external .icon.outbound {
        color: $dark;
      }
    }
  }

  @media (min-width: $MQMobile) {
    .nav-links a {
      &:hover, &.router-link-exact-active {
        color: inherit;
      }
    }
    .nav-item > a:not(.external) {
      &:hover, &.router-link-exact-active {
        margin-bottom: -2px;
        border-bottom: 2px solid $primary
      }
    }
  }

</style>
