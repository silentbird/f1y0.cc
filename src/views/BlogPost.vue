<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-3xl mx-auto">
        <article class="prose dark:prose-invert mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ post.title }}
          </h1>
          
          <div class="flex items-center space-x-4 mb-8 text-sm text-gray-500 dark:text-gray-400">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span>·</span>
            <span>{{ post.readingTime }} 分钟阅读</span>
            <span>·</span>
            <span>{{ post.category }}</span>
          </div>

          <div class="mb-8">
            <img :src="post.cover" :alt="post.title" class="rounded-lg shadow-lg w-full">
          </div>

          <div v-html="renderedContent" class="mt-8"></div>

          <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img :src="post.author.avatar" :alt="post.author.name" class="h-12 w-12 rounded-full">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ post.author.name }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ post.author.bio }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-4">
                <button class="btn btn-primary">
                  分享
                </button>
                <button class="btn btn-secondary">
                  订阅
                </button>
              </div>
            </div>
          </div>
        </article>

        <!-- 相关文章 -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">相关文章</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="card">
              <img :src="relatedPost.cover" :alt="relatedPost.title" class="w-full h-48 object-cover rounded-t-lg">
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {{ relatedPost.title }}
                </h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">
                  {{ relatedPost.excerpt }}
                </p>
                <router-link :to="'/blog/' + relatedPost.id" class="text-primary-600 dark:text-primary-400 hover:underline">
                  阅读更多 →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import dayjs from 'dayjs'

const route = useRoute()
const md = new MarkdownIt()

const post = ref({
  id: 1,
  title: '使用 Vue 3 和 Tailwind CSS 构建现代化博客',
  date: '2024-03-24',
  readingTime: 5,
  category: '前端开发',
  cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  content: `
# 使用 Vue 3 和 Tailwind CSS 构建现代化博客

这是一篇示例文章，展示了如何使用 Vue 3 和 Tailwind CSS 构建一个现代化的博客系统。

## 技术栈

- Vue 3
- Tailwind CSS
- Markdown
- Vite

## 功能特点

1. 响应式设计
2. 深色模式支持
3. Markdown 写作
4. 代码高亮
  `,
  author: {
    name: 'F1Y0',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: '全栈开发者，热爱技术，乐于分享。'
  }
})

const relatedPosts = ref([
  {
    id: 2,
    title: '深入理解 JavaScript 异步编程',
    excerpt: '探讨 JavaScript 中的异步编程模式，包括 Promise、async/await 等现代特性...',
    cover: 'https://images.unsplash.com/photo-1555066931-bf19f8e1083d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    title: 'Docker 容器化部署实践',
    excerpt: '分享使用 Docker 进行应用部署的最佳实践和常见问题解决方案...',
    cover: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
])

const renderedContent = ref('')

onMounted(() => {
  // 在实际应用中，这里应该根据路由参数获取文章内容
  renderedContent.value = md.render(post.value.content)
})

const formatDate = (date) => {
  return dayjs(date).format('YYYY年MM月DD日')
}
</script> 