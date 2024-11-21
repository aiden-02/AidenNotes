import DefaultTheme from 'vitepress/theme'
import './style/index.css' //引入自定义的样式

import Confetti from './components/Confetti.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Confetti', Confetti)
  },
}
