import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { withI18n } from 'vitepress-i18n'

// https://vitepress.dev/reference/site-config
const vitePressOptions: UserConfig<DefaultTheme.Config> = {
  title: 'Aiden Notes',
  description: '个人随笔',
  head: [['link', { rel: 'icon', href: '/logo_light.webp' }]],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '前端', link: '/前端/CSS/01_CSS基础' },
      { text: '计算机网络', link: '/计算机网络/01_计算机网络概览' },
      { text: '区块链', link: '/区块链/01_密码学原理' },
    ],
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
    logo: {
      light: '/logo_dark.webp',
      dark: '/logo_light.webp',
    },
    footer: {
      message: 'life is fxxking movie',
      copyright: '人生如戏',
    },
    editLink: {
      pattern: 'https://github.com/aiden-02/aidenotes/edit/main/docs/:path',
    },
    outline: {
      level: 'deep',
    },
  },
}

// https://vitepress-i18n.cdget.com/guide/options
const vitePressI18nOptions = {
  locales: ['zhHans'],
}

// https://vitepress-sidebar.cdget.com/zhHans/guide/options
const vitePressSidebarOptions = [
  {
    documentRootPath: 'docs',
    scanStartPath: '前端',
    resolvePath: '/前端/',
    collapsed: false, //折叠组关闭
    collapseDepth: 3, //折叠组2级菜单
    removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
    prefixSeparator: '_', //删除前缀的符号
  },
  {
    documentRootPath: 'docs',
    scanStartPath: '计算机网络',
    resolvePath: '/计算机网络/',
    removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
    prefixSeparator: '_', //删除前缀的符号
  },
  {
    documentRootPath: 'docs',
    scanStartPath: '区块链',
    resolvePath: '/区块链/',
    removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
    prefixSeparator: '_', //删除前缀的符号
  },
  {
    documentRootPath: 'docs',
    scanStartPath: '个人随笔',
    resolvePath: '/个人随笔/',
    removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
    prefixSeparator: '_', //删除前缀的符号
  },
]

export default defineConfig(
  withSidebar(
    withI18n(vitePressOptions, vitePressI18nOptions),
    vitePressSidebarOptions
  )
)
