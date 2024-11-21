import { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar | undefined = [
  {
    text: 'CSS',
    collapsed: false,
    items: [
      {
        text: 'CSS基础',
        link: '/frontend/css/CSS基础',
      },
      {
        text: '元素定位',
        link: '/frontend/css/元素定位',
      },
      {
        text: 'flex布局',
        link: '/frontend/css/flex布局',
      },
      {
        text: 'BFC',
        link: '/frontend/css/BFC',
      },
    ],
  },
  {
    text: 'JavaScript',
    collapsed: false,
    items: [
      {
        text: 'js初级',
        link: '/frontend/js/js初级',
      },
      {
        text: 'js高级',
        link: '/frontend/js/js高级',
      },
      {
        text: '浏览器渲染原理',
        link: '/frontend/js/浏览器渲染原理',
      },
    ],
  },
]
