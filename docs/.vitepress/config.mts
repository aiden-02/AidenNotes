import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { withI18n } from 'vitepress-i18n'

// https://vitepress.dev/reference/site-config
const vitePressOptions: UserConfig<DefaultTheme.Config> = {
  title: 'AideNotes',
  description: 'AideNotes',
  head: [['link', { rel: 'icon', href: '/logo_light.webp' }]],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/01_指南' },
      {
        text: '学习',
        items: [
          { text: '前端', link: '/frontend/CSS/01_CSS基础' },
          { text: '计算机网络', link: '/network/01_计算机网络概览' },
          { text: '区块链', link: '/blockchain/01_密码学原理' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aiden-02/aidenotes' },
    ],
    logo: {
      light: '/logo_dark.webp',
      dark: '/logo_light.webp',
    },
  },
}

// https://vitepress-i18n.cdget.com/guide/options
const vitePressI18nOptions = {
  locales: ['zhHans'],
  searchProvider: 'local' as const,
  themeConfig: {
    zhHans: {
      outline: {
        level: 'deep',
        label: '页面导航',
      },
      editLink: undefined,
    },
  },
}

const vitePressSidebarCommonOption = {
  documentRootPath: 'docs',
  collapsed: false, //折叠组关闭
  collapseDepth: 2, //折叠组2级菜单
  removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
  prefixSeparator: '_', //删除前缀的符号
}

// https://vitepress-sidebar.cdget.com/zhHans/guide/options
const vitePressSidebarOptions = [
  {
    ...vitePressSidebarCommonOption,
    scanStartPath: 'frontend',
    resolvePath: '/frontend/',
  },
  {
    ...vitePressSidebarCommonOption,
    scanStartPath: 'network',
    resolvePath: '/network/',
  },
  {
    ...vitePressSidebarCommonOption,
    scanStartPath: 'blockchain',
    resolvePath: '/blockchain/',
  },
  {
    ...vitePressSidebarCommonOption,
    scanStartPath: 'guide',
    resolvePath: '/guide/',
  },
]

export default defineConfig(
  withSidebar(
    withI18n(vitePressOptions, vitePressI18nOptions),
    vitePressSidebarOptions
  )
)
