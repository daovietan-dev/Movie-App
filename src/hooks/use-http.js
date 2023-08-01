import { useState } from 'react'

/**
 * create an available kit for Http request
 * @returns an object contains sendRequest func, isLoading state and error message (defaultError is null)
 */
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = async (fetchOption, dataHandle) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(fetchOption.url, {
        method: fetchOption.method || `get`,
        body: JSON.stringify(fetchOption.body) || null,
        headers: fetchOption.headers,
      })

      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})!`)
      }

      const data = await response.json()

      dataHandle(data)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  return { sendRequest, isLoading, error }
}

export default useHttp
