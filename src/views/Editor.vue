<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">写文章</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">标题</label>
                <input type="text" id="title" v-model="post.title"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>

              <div>
                <label for="excerpt" class="block text-sm font-medium text-gray-700">摘要</label>
                <textarea id="excerpt" v-model="post.excerpt" rows="3"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">分类</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  <div v-for="category in post.categories" :key="category"
                       class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ category }}
                    <button type="button" @click="removeCategory(category)"
                            class="ml-1 text-blue-600 hover:text-blue-800">
                      ×
                    </button>
                  </div>
                  <div class="inline-flex">
                    <input type="text" v-model="newCategory"
                           @keydown.enter.prevent="addCategory"
                           placeholder="添加分类"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                    <button type="button" @click="addCategory"
                            class="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      添加
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">标签</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  <div v-for="tag in post.tags" :key="tag"
                       class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ tag }}
                    <button type="button" @click="removeTag(tag)"
                            class="ml-1 text-gray-600 hover:text-gray-800">
                      ×
                    </button>
                  </div>
                  <div class="inline-flex">
                    <input type="text" v-model="newTag"
                           @keydown.enter.prevent="addTag"
                           placeholder="添加标签"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                    <button type="button" @click="addTag"
                            class="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                      添加
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label for="content" class="block text-sm font-medium text-gray-700">内容 (Markdown)</label>
                <div class="mt-1 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <textarea id="content" v-model="post.content" rows="20"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"></textarea>
                  <div class="prose max-w-none p-4 bg-gray-50 rounded-md overflow-auto">
                    <div v-html="renderedContent"></div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-4">
                <router-link to="/"
                            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  取消
                </router-link>
                <button type="submit"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import MarkdownIt from 'markdown-it'

const router = useRouter()
const route = useRoute()
const blogStore = useBlogStore()
const md = new MarkdownIt()

const post = ref({
  title: '',
  excerpt: '',
  content: '',
  categories: [],
  tags: []
})

const newCategory = ref('')
const newTag = ref('')

const renderedContent = computed(() => {
  if (!post.value.content) return ''
  return md.render(post.value.content)
})

const addCategory = () => {
  if (newCategory.value && !post.value.categories.includes(newCategory.value)) {
    post.value.categories.push(newCategory.value)
    newCategory.value = ''
  }
}

const removeCategory = (category) => {
  post.value.categories = post.value.categories.filter(c => c !== category)
}

const addTag = () => {
  if (newTag.value && !post.value.tags.includes(newTag.value)) {
    post.value.tags.push(newTag.value)
    newTag.value = ''
  }
}

const removeTag = (tag) => {
  post.value.tags = post.value.tags.filter(t => t !== tag)
}

const handleSubmit = () => {
  if (route.params.id) {
    blogStore.updatePost(parseInt(route.params.id), post.value)
  } else {
    blogStore.addPost(post.value)
  }
  router.push('/')
}

onMounted(() => {
  if (route.params.id) {
    const existingPost = blogStore.getPostById(route.params.id)
    if (existingPost) {
      post.value = { ...existingPost }
    }
  }
})
</script> 