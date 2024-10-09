import { Riple } from "react-loading-indicators"

type OutputProps = {
  uri: string | undefined
  setUri: React.Dispatch<React.SetStateAction<string | undefined>>
  isLoading: boolean
}

const Output = ({
  uri,
  setUri,
  isLoading
}: OutputProps) => {
  
  const onDownload = () => {
    // API...
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
      </div>
    )
  }
  return null
}

export default Output