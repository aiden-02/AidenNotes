import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/aidenotes/',
  title: 'Aiden Notes',
  description: '个人笔记',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/aidenotes/logo.webp' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '前端',
        link: '/frontend/css/',
      },
    ],
    sidebar: [
      {
        text: 'CSS',
        link: '/frontend/css/',
      },
      {
        text: 'JavaScript',
        collapsed: true,
        items: [
          {
            text: 'js初级',
            link: '/frontend/js/primary',
          },
          {
            text: 'js高级',
            link: '/frontend/js/senior',
          },
        ],
      },
    ],
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
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
    search: {
      provider: 'local',
    },
    logo: '/logo.webp',
  },
})
