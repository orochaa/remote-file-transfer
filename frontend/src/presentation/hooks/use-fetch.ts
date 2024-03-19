import useSWR from 'swr'

interface FetchResult<R> {
  data?: R | undefined
  mutate: (data: R | undefined, refetch: boolean) => void
}

/**
 * @param uri Ex: /user
 * @return fetch data
 */
export function useFetch<R>(uri: string): FetchResult<R> {
  const { data, mutate } = useSWR<R | undefined>(uri, async (uri: string) => {
    if (uri.endsWith('/')) {
      return undefined
    }

    return fetch(uri).then(async res => res.json() as Promise<R>)
  })

  return { data, mutate }
}
