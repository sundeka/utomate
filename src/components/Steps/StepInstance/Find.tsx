import { useState } from "react"
import { FindStep, Step} from "../../../objects/Step"
import { StepType } from "../../../objects/StepType"

type FindProps = {
  close: () => void
  steps: Step[]
  update: React.Dispatch<React.SetStateAction<Step[]>>
  onUpdate: () => void
  data?: FindStep
}

const Find = (
  {
    close,
    steps,
    update,
    onUpdate,
    data,
  }
  : FindProps) => {
  const [strategy, setStrategy] = useState<string>(data ? data.strategy : "xpath")
  const [until, setUntil] = useState<string>(data ? data.until : "presence")
  const [locator, setLocator] = useState<string | undefined>(data ? data.locator : undefined)

  const canProceed: boolean = !!strategy && !!until && !!locator
  
  const onSubmit = () => {
    const step: FindStep = {
      strategy: strategy,
      until: until,
      locator: locator ? locator : "",
      id: steps.length+1,
      type: StepType.Find
    }
    update([...steps, step]) // needs fixing: adding vs editing
    onUpdate()
  }
  
  return (
    <div className="action" id="instance">
      <div className="action__header">
        <h2>Find an element</h2>
        <i className="fa-solid fa-xmark" onClick={() => close()}></i>
      </div>
      <div id="rows">
        <div id="row">
          <label>Strategy</label>
          <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStrategy(e.target.value)}>
            <option value="xpath" selected={strategy === "xpath"}>XPath</option>
            <option value="css" selected={strategy === "css"}>CSS</option>
          </select>
        </div>
        <div id="row">
          <label>Until</label>
          <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUntil(e.target.value)}>
            <option value="presence" selected={until === "presence"}>Presence of element located</option>
            <option value="visibility" selected={until === "visibility"}>Visibility of element located</option>
          </select>
        </div>
        <div id="row">
          <label>Locator</label>
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocator(e.target.value)} defaultValue={locator ? locator : undefined}></input>
        </div>
      </div>
      <div className="instance__footer">
        <div className="footer__ok-button" onClick={() => onSubmit()}>
          <span>OK</span>
        </div>
      </div>
    </div>
  )
}

export default Find