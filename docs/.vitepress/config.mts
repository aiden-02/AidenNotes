import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { withI18n } from 'vitepress-i18n'

const vitepressSidebarOptions = {
  documentRootPath: '/docs',
  collapsed: false, //折叠组关闭
  collapseDepth: 3, //折叠组2级菜单
  removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
  prefixSeparator: '_', //删除前缀的符号
}

// https://vitepress.dev/reference/site-config
const vitePressOptions: UserConfig<DefaultTheme.Config> = {
  base: '/aidenotes/',
  title: 'Aiden Notes',
  description: '个人随笔',
  lang: 'zh',
  head: [['link', { rel: 'icon', href: '/aidenotes/logo.webp' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: generateSidebar(vitepressSidebarOptions),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aiden-02/aidenotes' },
    ],
    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
    search: {
      provider: 'local',
    },
    logo: '/logo.webp',
    footer: {
      message: 'life is fxxking movie',
      copyright: '人生如戏',
    },
    editLink: {
      pattern: 'https://github.com/aiden-02/aidenotes/edit/main/docs/:path',
    },
  },
}

// https://vitepress-i18n.cdget.com/guide/options
const vitePressI18nOptions = {
  locales: ['zhHans'],
}

export default defineConfig(withI18n(vitePressOptions, vitePressI18nOptions))
