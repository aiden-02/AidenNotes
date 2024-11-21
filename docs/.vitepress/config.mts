import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { withI18n } from 'vitepress-i18n'

// https://vitepress.dev/reference/site-config
const vitePressOptions: UserConfig<DefaultTheme.Config> = {
  base: '/aidenotes/',
  title: 'Aiden Notes',
  description: '个人随笔',
  head: [['link', { rel: 'icon', href: '/aidenotes/logo.webp' }]],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: '前端笔记', link: '/前端/CSS/01_CSS基础' }],
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
