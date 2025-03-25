<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">博客文章</h1>
        <p class="text-xl text-gray-500 dark:text-gray-400">分享技术经验和学习笔记</p>
      </div>

      <!-- 分类和标签筛选 -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">分类</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="category in categories" 
                      :key="category"
                      @click="selectedCategory = category"
                      :class="[
                        'px-3 py-1 rounded-full text-sm font-medium',
                        selectedCategory === category
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      ]">
                {{ category }}
              </button>
            </div>
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">标签</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="tag in tags" 
                      :key="tag"
                      @click="selectedTag = tag"
                      :class="[
                        'px-3 py-1 rounded-full text-sm font-medium',
                        selectedTag === tag
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      ]">
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="grid gap-8">
        <article v-for="post in filteredPosts" 
                 :key="post.id"
                 class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div class="p-6">
            <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <time :datetime="post.createdAt">
                {{ new Date(post.createdAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) }}
              </time>
              <span v-for="category in post.categories" 
                    :key="category"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                {{ category }}
              </span>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <router-link :to="'/blog/' + post.id" 
                          class="hover:text-primary-600 dark:hover:text-primary-400">
                {{ post.title }}
              </router-link>
            </h2>
            
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              {{ post.excerpt }}
            </p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in post.tags" 
                    :key="tag"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {{ tag }}
              </span>
            </div>
            
            <div class="flex items-center justify-between">
              <router-link :to="'/blog/' + post.id" 
                          class="text-primary-600 dark:text-primary-400 hover:underline">
                阅读更多 →
              </router-link>
              <div class="flex items-center space-x-2">
                <img :src="post.author?.avatar" 
                     :alt="post.author?.name"
                     class="h-8 w-8 rounded-full">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ post.author?.name }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">暂无文章</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">开始写你的第一篇文章吧！</p>
        <div class="mt-6">
          <router-link to="/editor"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
            写文章
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()
const selectedCategory = ref(null)
const selectedTag = ref(null)

const categories = computed(() => [...blogStore.categories])
const tags = computed(() => [...blogStore.tags])

const filteredPosts = computed(() => {
  let posts = blogStore.sortedPosts

  if (selectedCategory.value) {
    posts = posts.filter(post => post.categories.includes(selectedCategory.value))
  }

  if (selectedTag.value) {
    posts = posts.filter(post => post.tags.includes(selectedTag.value))
  }

  return posts
})
</script> 