type LoadingExplanationPopup = {
  show: boolean
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingExplanationPopup = ({
  show,
  setVisibility
}: LoadingExplanationPopup) => {
  if (show) {
    return (
      <div className="loading-explanation-popup">
        <i className="fa-solid fa-xmark" id="close" onClick={() => setVisibility(false)}></i>
        <span>Due to its hobbyist nature, u-Tomate is hosted on a free service plan.</span>
        <span>In practice this means that the cloud app has to boot itself every time it is called, which takes time.</span>
      </div>
    )
  }
  return <></>
}

export default LoadingExplanationPopup