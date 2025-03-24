<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">文章分类</h2>
      
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="category in categories" :key="category"
             class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ category }}
            <span class="text-sm text-gray-500">
              ({{ getPostsByCategory(category).length }} 篇文章)
            </span>
          </h3>
          
          <ul class="space-y-3">
            <li v-for="post in getPostsByCategory(category)" :key="post.id"
                class="flex items-center justify-between">
              <router-link :to="{ name: 'PostDetail', params: { id: post.id }}"
                          class="text-sm text-gray-600 hover:text-blue-600">
                {{ post.title }}
              </router-link>
              <span class="text-xs text-gray-500">
                {{ new Date(post.createdAt).toLocaleDateString() }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div v-if="categories.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">暂无分类</h3>
        <p class="mt-1 text-sm text-gray-500">开始创建你的第一个分类吧！</p>
        <div class="mt-6">
          <router-link to="/editor"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            写文章
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()

const categories = computed(() => [...blogStore.categories])

const getPostsByCategory = (category) => {
  return blogStore.getPostsByCategory(category)
}
</script> 