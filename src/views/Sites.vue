<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">个人网站导航</h1>
        <p class="text-xl text-gray-500 dark:text-gray-400">我的个人网站集合</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 网站卡片 -->
        <a v-for="site in sites" :key="site.id" 
           :href="site.url" 
           target="_blank" 
           rel="noopener noreferrer"
           class="group">
          <div class="card h-full p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <component :is="site.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {{ site.name }}
              </h2>
            </div>
            <p class="text-gray-500 dark:text-gray-400">{{ site.description }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="tag in site.tags" 
                    :key="tag"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {{ tag }}
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FolderIcon, CpuChipIcon, ArrowsRightLeftIcon } from '@heroicons/vue/24/outline'

const sites = ref([
  {
    id: 1,
    name: 'Alist 网盘',
    url: 'http://alist.f1y0.cc',
    description: '基于 Alist 的个人网盘系统，支持多种存储方式',
    icon: FolderIcon,
    tags: ['网盘', '存储', '文件管理']
  },
  {
    id: 2,
    name: 'Op 后台管理',
    url: 'http://op.f1y0.cc',
    description: 'OpenWrt 固件下载和配置指南',
    icon: CpuChipIcon,
    tags: ['路由器', '固件', 'OpenWrt']
  },
  {
    id: 3,
    name: 'Frp 后台管理',
    url: 'http://frp.f1y0.cc',
    description: '基于 Frp 的内网穿透服务，支持多种协议',
    icon: ArrowsRightLeftIcon,
    tags: ['内网穿透', '网络', '服务']
  }
])
</script> 