<template>
  <article class="card">
    <div class="p-6">
      <header class="mb-8">
        <div class="flex items-center space-x-4 text-sm text-[#2c3e50] mb-4">
          <time :datetime="post?.createdAt">
            {{ new Date(post?.createdAt).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) }}
          </time>
          <span v-for="category in post?.categories" :key="category"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#42b883]/10 text-[#42b883]">
            {{ category }}
          </span>
        </div>
        
        <h1 class="text-3xl font-bold text-[#2c3e50] mb-4">{{ post?.title }}</h1>
        
        <div class="flex flex-wrap gap-2">
          <span v-for="tag in post?.tags" :key="tag"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-[#2c3e50]">
            {{ tag }}
          </span>
        </div>
      </header>

      <div class="prose max-w-none" v-html="renderedContent"></div>

      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex justify-between items-center">
          <div class="flex space-x-4">
            <button @click="handleEdit"
                    class="inline-flex items-center text-sm font-medium text-[#2c3e50] hover:text-[#42b883]">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              编辑
            </button>
            <button @click="handleDelete"
                    class="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-700">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              删除
            </button>
          </div>
          <router-link to="/" 
                      class="inline-flex items-center text-sm font-medium text-[#2c3e50] hover:text-[#42b883]">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </router-link>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import MarkdownIt from 'markdown-it'

const router = useRouter()
const route = useRoute()
const blogStore = useBlogStore()
const md = new MarkdownIt()

const post = computed(() => blogStore.currentPost)
const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  return md.render(post.value.content)
})

const handleEdit = () => {
  router.push({ name: 'Editor', params: { id: post.value.id }})
}

const handleDelete = () => {
  if (confirm('确定要删除这篇文章吗？')) {
    blogStore.deletePost(post.value.id)
    router.push('/')
  }
}

onMounted(() => {
  const post = blogStore.getPostById(route.params.id)
  if (post) {
    blogStore.setCurrentPost(post)
  } else {
    router.push('/')
  }
})
</script> 