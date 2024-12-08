---
title: 性能优化
order: 3
---

前端性能优化是提升用户体验的重要一环，它可以减少页面加载时间、提高交互响应速度以及降低资源消耗。以下是一些常见的前端性能优化手段，以及详细的说明：

## 一、资源加载优化

1. **减少 HTTP 请求**

   - 合并 CSS 和 JavaScript 文件。
   - 使用 CSS 精灵图 (Sprite) 减少图片请求。
   - 在必要时合并小图标为一个 SVG 图标集。

2. **使用内容分发网络 (CDN)**

   - 将静态资源（如图片、CSS、JavaScript）托管到 CDN 上，提高资源加载速度。

3. **文件压缩与打包**

   - 使用工具（如 Webpack、Rollup）进行文件打包。
   - 压缩 JavaScript、CSS、HTML 文件（如通过 Terser、CSSNano 等工具）。
   - 使用 Gzip 或 Brotli 对传输内容进行压缩。

4. **延迟加载 (Lazy Loading)**

   - 对图片和 iframe 等非关键资源使用懒加载。
   - 使用 `loading="lazy"` 属性，或结合 IntersectionObserver 实现。

5. **异步加载资源**

   - 使用 `<script async>` 或 `<script defer>` 异步加载 JavaScript。
   - 按需加载模块化代码（如动态 `import()`）。

6. **减少和优化第三方资源**

   - 精简使用的第三方库（如替换大型库为轻量替代品）。
   - 使用高效的第三方 API 并减少其调用次数。

## 二、提高页面渲染效率

1. **优化关键渲染路径**

   - 减少 CSS 和 JavaScript 阻塞。
   - 提取关键 CSS，内联到 HTML 中。
   - 将非关键 CSS 延迟加载。

2. **启用浏览器缓存**

   - 设置合理的缓存策略（如 `Cache-Control` 和 `ETag`）。
   - 对静态资源使用长时间缓存（如版本号控制文件更新）。

3. **首屏渲染优化**

   - 使用服务器端渲染 (SSR) 或预渲染（如 Next.js）。
   - 使用骨架屏设计，减少用户等待时间的感知。

4. **减少重绘和重排**

   - 避免频繁修改 DOM。
   - 尽量使用 CSS 动画而不是 JavaScript 动画。
   - 使用 `transform` 和 `opacity` 属性实现高效动画。

## 三、网络传输优化

1. **使用 HTTP/2 或 HTTP/3**

   - 提升多路复用能力，减少连接延迟。

2. **开启资源预加载**

   - 使用 `<link rel="preload">` 和 `<link rel="prefetch">` 提前加载关键资源。

3. **使用服务端推送 (Server Push)**

   - 通过 HTTP/2 提前推送重要资源到客户端。

## 四、图片和媒体优化

1. **使用现代图片格式**

   - 使用 WebP、AVIF 等更高效的图片格式。

2. **图片压缩**

   - 使用工具（如 TinyPNG、ImageOptim）对图片进行无损或有损压缩。

3. **响应式图片**

   - 使用 `srcset` 和 `sizes` 属性提供适合不同屏幕的图片。

4. **视频优化**

   - 使用合适的视频格式（如 MP4、WebM）。
   - 设置合理的码率和分辨率。
   - 延迟加载视频资源。

## 五、代码优化

1. **移除未使用的代码**

   - 使用工具（如 PurifyCSS、Tree Shaking）清理无用 CSS 和 JavaScript。

2. **代码分割**

   - 利用 Webpack 的代码分割功能，按需加载模块。

3. **缩小 CSS 选择器范围**

   - 使用高效的选择器，避免过度层级嵌套。

4. **减少全局作用域污染**

   - 使用模块化（ES6 模块、CommonJS）封装代码。

## 六、性能监控和调优

1. **使用性能分析工具**

   - 浏览器 DevTools 的 Performance 和 Lighthouse。
   - 第三方监控平台（如 Google Analytics、Sentry）。

2. **监控和分析实际性能**

   - 收集真实用户数据 (RUM)。
   - 持续关注关键性能指标 (Core Web Vitals)，如 LCP、FID、CLS。

3. **模拟低速网络和设备**

   - 使用 Chrome DevTools 模拟弱网环境。
   - 测试低性能设备上的加载和交互性能。

通过结合以上优化手段，前端性能可以大幅度提升，从而为用户提供更流畅和愉悦的体验。
