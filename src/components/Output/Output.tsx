import { useEffect, useState } from "react"
import { Riple } from "react-loading-indicators"

type OutputProps = {
  api: string
  uri: string | undefined
  setUri: React.Dispatch<React.SetStateAction<string | undefined>>
  fileName: string
  isLoading: boolean
}

const Output = ({
  api,
  uri,
  setUri,
  fileName,
  isLoading
}: OutputProps) => {
  const dotStates = [' . ', ' . . ', ' . . . ']
  const [dots, setDots] = useState<string>(dotStates[0])

  useEffect(() => {
    let index = 1
    const interval = setInterval(() => {
      setDots(dotStates[index])
      index = (index + 1) % dotStates.length
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  async function onDownload() {
    const response = await fetch(api + uri)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName + ".txt"
    document.body.appendChild(a) // Append link to the body (needed for Firefox)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
    setUri(undefined)
  }
  
  if (uri) {
    return (
      <div className="output" id="data">
        <div className="generate download" onClick={() => onDownload()}>
          <i className="fa-solid fa-download"></i>
          <span>Download robot</span>
        </div>
        <div className="generate cancel" onClick={() => setUri(undefined)}>
          <span>Cancel</span>
        </div>
      </div>
    )
  } else if (isLoading) {
    return (
      <div className="output" id="loading" data-testid="load-wrapper">
        <Riple color="#3f3f3f" size="large" />
        <span>Your robot is being generated{dots}</span>
      </div>
    )
  }
  return null
}

export default Output