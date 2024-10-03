import { useState } from "react"
import { FindStep, Step} from "../../../objects/Step"
import { StepType } from "../../../objects/StepType"

type FindProps = {
  close: () => void
  data?: FindStep
  update?: React.Dispatch<React.SetStateAction<Step[]>>
  handleCommit?: () => void
}

const Find = (
  {
    close,
    data,
    update,
    handleCommit
  }
  : FindProps) => {
  const [strategy, setStrategy] = useState<string | undefined>(data ? data.strategy : undefined)
  const [until, setUntil] = useState<string | undefined>(data ? data.until : undefined)
  const [locator, setLocator] = useState<string | undefined>(data ? data.locator : undefined)

  const onSubmit = () => {
    const step: FindStep = {
      strategy: "",
      until: "",
      locator: "",
      id: 0,
      type: StepType.Find
    }
    console.log(step)
    //update([...steps, step])
    //handleCommit()
  }
  
  return (
    <div className="steps__instance">
      <div className="instance__header">
        <h2>Find an element</h2>
      </div>
      <>
        <div id="row">
          <label>Strategy</label>
          <select>
            <option value="xpath" selected={strategy === "xpath"}>XPath</option>
            <option value="css" selected={strategy === "css"}>CSS</option>
          </select>
        </div>
        <div id="row">
          <label>Until</label>
          <select>
            <option value="presence" selected={until === "presence"}>Presence of element located</option>
            <option value="visibility" selected={until === "presence"}>Visibility of element located</option>
          </select>
        </div>
        <div id="row">
          <label>Locator</label>
          <input defaultValue={locator ? locator : undefined}></input>
        </div>
      </>
      <div className="instance__footer">
        <div className="footer__ok-button" onClick={() => onSubmit()}>
          <span>OK</span>
        </div>
      </div>
    </div>
  )
}

export default Find