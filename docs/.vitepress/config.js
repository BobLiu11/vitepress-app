export default {
  title: "VitePress",
  titleTemplate: ":title-Custom Suffix",
  description: "Just playing around.",
  head: [
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
  ],
  lang: "",
  base: "/",
  rewrites: {
    //'source/:page': 'destination/:page'
  },
  lastUpdated: true,
  themeConfig: {
    siteTitle: '学习博客',
    outlineTitle: '目录',
    //logo: '/public/sun1.png',
    editLink: {
      pattern: 'https://github.com/BobLiu11/vitepress-app/blob/main/docs/:path'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: [
      { text: "vitePress", link: "/" },
      { text: "vue", link: "./vue/index" },
      { text: "github", link: "https://github.com/BobLiu11/vitepress-app" },
    ],
    lastUpdated: {
      text: "最后更新于:",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Evan You'
    },
    sidebar: [
      {
        text: "目录",
        items: [
          { text: "vitePress", link: "/index" },
          { text: "vue", link: "/vue/index" },
          { text: "vue3的设计与实现", link: "/vue/vue3" },
        ],
      },
    ],
    externalLinkIcon:true,
    //全局搜索
    search: {
      provider: "local",
    },
    options: {
      appId: "...",
      apiKey: "...",
      indexName: "...",
      locales: {
        zh: {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    },
    //广告
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
  },
};
