<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <nav class="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">F1Y0</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/blog" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              博客
            </router-link>
            <router-link to="/about" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              关于
            </router-link>
            <button @click="toggleDarkMode" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg v-if="isDark" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">关于博客</h3>
            <p class="text-gray-500 dark:text-gray-400">
              这是一个使用 Vue 3 和 Tailwind CSS 构建的现代化博客系统。
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">快速链接</h3>
            <ul class="space-y-2">
              <li>
                <router-link to="/" class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  首页
                </router-link>
              </li>
              <li>
                <router-link to="/about" class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  关于
                </router-link>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">联系方式</h3>
            <ul class="space-y-2">
              <li class="text-gray-500 dark:text-gray-400">
                <a href="mailto:f1y0@example.com" class="hover:text-primary-600 dark:hover:text-primary-400">
                  f1y0@example.com
                </a>
              </li>
              <li class="text-gray-500 dark:text-gray-400">
                <a href="https://github.com/f1y0" target="_blank" rel="noopener noreferrer" class="hover:text-primary-600 dark:hover:text-primary-400">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} F1Y0. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
