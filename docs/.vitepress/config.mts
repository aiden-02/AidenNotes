import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

const vitepressSidebarOptions = {
  documentRootPath: '/docs',
  collapsed: false, //折叠组关闭
  collapseDepth: 3, //折叠组2级菜单
  removePrefixAfterOrdering: true, //删除前缀，必须与prefixSeparator一起使用
  prefixSeparator: '_', //删除前缀的符号
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '上次更新于:',
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
  },
})
