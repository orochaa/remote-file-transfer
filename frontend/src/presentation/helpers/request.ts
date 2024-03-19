export function formatRequest(...uri: string[]): string {
  const api = import.meta.env.VITE_API_URL
  const url = [api, uri.map(e => encodeURI(e))].flat().join('/')

  return url
}

export function handleDownload(type: 'file' | 'upload', id: string) {
  return (): void => {
    fetch(formatRequest('download', type, id))
      .then(async res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.rel = 'noreferrer'
        link.target = '_blank'
        link.href = url
        link.download = `${type}-${id}`

        document.body.append(link)
        link.click()

        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          link.remove()
        }, 1000)
      })
      .catch(console.error)
  }
}
