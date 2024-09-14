<template>
  <div>嘻嘻嘻</div>
</template>

<script setup>
import Axios from 'axios'
import config from '../config.json'
import { Buffer } from 'buffer'

const downloadAndExtractGeoLite2Country = async () => {
  try {
    const url = `https://download.maxmind.com/geoip/databases/GeoLite2-Country/download?suffix=tar.gz`

    // 阻止 Axios 进行重定向
    const response = await Axios.get(url, {
      responseType: 'arraybuffer',
      // maxRedirects: 0, // 阻止自动重定向
      auth: {
        username: config.accountId,
        password: config.licenseKey.replace(/&/g, '')
      }
    })
    console.log(response, 'response')
    let data = response.data
    // 如果响应状态是 302 或 301，获取重定向地址
    if (response.status === 302 || response.status === 301) {
      const redirectUrl = response.headers['location']
      console.log('Redirecting to:', redirectUrl)

      // 手动处理重定向并发起下载请求
      const downloadResponse = await Axios.get(redirectUrl, {
        responseType: 'arraybuffer'
      })

      data = downloadResponse.data
    }

    // 下载和处理文件的代码
    const buffer = Buffer.from(data)
    const blob = new Blob([buffer], { type: 'application/octet-stream' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'GeoLite2-Country.tar.gz'
    link.click()
  } catch (error) {
    alert('下载 GeoLite2-Country 数据库时出错: ' + error.response.statusText)
  }
}

downloadAndExtractGeoLite2Country()
</script>
