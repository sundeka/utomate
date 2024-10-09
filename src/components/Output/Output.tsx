import { Riple } from "react-loading-indicators"

type OutputProps = {
  data: any
  isLoading: boolean
}

const Output = ({
  data,
  isLoading
}: OutputProps) => {
  if (data) {
    return (
      <div className="output" id="data">
        <p style={{color: "white"}}>{data}</p>
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