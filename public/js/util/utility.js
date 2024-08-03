export const getQueryParams = (url) => {
  const params = {}
  const queryString = url.split('?')[1]
  if (queryString) {
    const pairs = queryString.split('&')
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=')
      params[pair[0]] = decodeURIComponent(pair[1])
    }
  }
  return params
}

