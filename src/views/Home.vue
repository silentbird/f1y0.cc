<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
    <!-- 导航卡片网格 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">F1Y0 导航</h1>
        <p class="text-xl text-gray-500 dark:text-gray-400">快速访问常用功能和资源</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 博客导航卡片 -->
        <router-link to="/blog" class="group">
          <div class="card h-full p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
              </div>
              <h2 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">博客文章</h2>
            </div>
            <p class="text-gray-500 dark:text-gray-400">浏览最新的技术文章和教程</p>
          </div>
        </router-link>

        <!-- 项目导航卡片 -->
        <a href="#" class="group">
          <div class="card h-full p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">开源项目</h2>
            </div>
            <p class="text-gray-500 dark:text-gray-400">查看我的开源项目集合</p>
          </div>
        </a>

        <!-- 工具导航卡片 -->
        <a href="#" class="group">
          <div class="card h-full p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">在线工具</h2>
            </div>
            <p class="text-gray-500 dark:text-gray-400">实用的在线开发工具集合</p>
          </div>
        </a>

        <!-- 资源导航卡片 -->
        <a href="#" class="group">
          <div class="card h-full p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">学习资源</h2>
            </div>
            <p class="text-gray-500 dark:text-gray-400">精选的学习材料和教程</p>
          </div>
        </a>

        <!-- 关于导航卡片 -->
        <router-link to="/about" class="group">
          <div class="card h-full p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">关于我</h2>
            </div>
            <p class="text-gray-500 dark:text-gray-400">了解更多关于我的信息</p>
          </div>
        </router-link>

        <!-- 联系导航卡片 -->
        <a href="#" class="group">
          <div class="card h-full p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">联系方式</h2>
            </div>
            <p class="text-gray-500 dark:text-gray-400">获取我的联系方式</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑
</script> 