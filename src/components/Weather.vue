<template>
  <div class="weather-widget hidden">
    <div v-if="loading" class="text-gray-500 dark:text-gray-400">
      加载天气信息...
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else class="flex items-center space-x-2">
      <span class="text-gray-700 dark:text-gray-300">{{ weather.city }}</span>
      <span class="text-gray-600 dark:text-gray-400">{{ weather.temperature }}°C</span>
      <span class="text-gray-600 dark:text-gray-400">{{ weather.description }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'

const weather = ref(null)
const loading = ref(true)
const error = ref(null)

// 高德开放平台 Web服务 API key
const AMAP_KEY = import.meta.env.VITE_AMAP_KEY

const showError = (message) => {
  error.value = message
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })
}

const getWeather = async () => {
  try {
    // 检查 API key 是否存在
    if (!AMAP_KEY) {
      throw new Error('未配置高德地图 API Key，请在 .env 文件中设置 VITE_AMAP_KEY')
    }

    // 1. 通过 IP 定位获取城市编码
    const ipResponse = await fetch(`https://restapi.amap.com/v3/ip?key=${AMAP_KEY}`)
    if (!ipResponse.ok) {
      throw new Error(`获取位置信息失败: ${ipResponse.status} ${ipResponse.statusText}`)
    }
    const ipData = await ipResponse.json()
    if (ipData.status !== '1') {
      throw new Error(ipData.info || '获取位置信息失败')
    }
    if (!ipData.adcode) {
      throw new Error('无法获取城市编码')
    }

    // 2. 获取天气信息
    const weatherResponse = await fetch(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${ipData.adcode}&extensions=base`
    )
    if (!weatherResponse.ok) {
      throw new Error(`获取天气信息失败: ${weatherResponse.status} ${weatherResponse.statusText}`)
    }
    const weatherData = await weatherResponse.json()
    if (weatherData.status !== '1') {
      throw new Error(weatherData.info || '获取天气信息失败')
    }
    if (!weatherData.lives?.[0]) {
      throw new Error('天气数据格式错误')
    }

    const live = weatherData.lives[0]
    // 检查必要的天气数据字段
    if (!live.city || !live.temperature || !live.weather) {
      throw new Error('天气数据不完整')
    }

    weather.value = {
      city: live.city,
      temperature: live.temperature,
      description: `${live.weather} ${live.winddirection || ''}${live.winddirection ? '风' : ''}${live.windpower ? live.windpower + '级' : ''}`
    }

    // 显示天气通知
    toast.success(`${weather.value.city} ${weather.value.temperature}°C ${weather.value.description}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    })
  } catch (e) {
    console.error('Weather error:', e)
    showError(e.message || '无法获取天气信息')
  } finally {
    loading.value = false
  }
}

// 定时更新天气信息（每30分钟）
let weatherUpdateTimer

onMounted(() => {
  getWeather()
  weatherUpdateTimer = setInterval(getWeather, 30 * 60 * 1000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (weatherUpdateTimer) {
    clearInterval(weatherUpdateTimer)
  }
})
</script> 