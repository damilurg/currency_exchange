export const useURL = () => {
  function getQueryParams() {
    const result = {}
    const params = new URLSearchParams(window.location.search)

    for (const [key, value] of params) {
      if (value && value !== 'undefined') {
        result[key] = value
      }
    }
    return result
  }

  function setQueryParams(params) {
    const url = new URL(window.location.href)

    Object.entries(params).forEach(([key, value]) => {
      if (value || typeof value === 'string') {
        url.searchParams.set(key, value)
      }
    })

    window.history.pushState({}, '', url.pathname + url.search)
  }

  return {
    getQueryParams,
    setQueryParams,
  }
}
