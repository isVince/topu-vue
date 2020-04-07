export default function({ $axios, app, redirect }) {
  $axios.setToken(app.$cookies.get('token'))

  $axios.onResponse(response => {
    if (response.error) {
      app.store.commit('notice/error', { text: response.error })
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      app.store.commit('notice/error', {
        text: '请先登录！'
      })
    } else if (code === 403) {
      redirect('/')
    } else if (code === 500) {
      app.store.commit('notice/error', {
        text: error.response.error || '服务错误，请稍后重试！'
      })
    }
  })
}
