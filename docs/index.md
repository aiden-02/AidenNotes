---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Aiden Notes'
  text: '个人笔记'
  tagline: 以及可能性碎碎念 :)
  image:
    src: /home.webp
  actions:
    - theme: brand
      text: 开始阅读
      link: /frontend/css
    - theme: alt
      text: View on GitHub
      link: https://github.com/aiden-02/aidenotes
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
