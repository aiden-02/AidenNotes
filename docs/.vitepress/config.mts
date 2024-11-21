import { defineConfig } from 'vitepress'
import { sidebar } from './configs/sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/aidenotes/',
  title: 'Aiden Notes',
  description: '个人随笔',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/aidenotes/logo.webp' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '前端',
        items: [
          { text: 'CSS', link: '/frontend/css/CSS基础' },
          {
            text: 'JavaScript',
            link: '/frontend/js/js初级',
          },
        ],
      },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aiden-02/aidenotes' },
    ],
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium',
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
