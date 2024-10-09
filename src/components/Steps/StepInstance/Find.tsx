import { useState } from "react"
import { FindStep, Step} from "../../../objects/Step"
import { StepType } from "../../../objects/StepType"

type FindProps = {
  close: () => void
  steps: Step[]
  update: React.Dispatch<React.SetStateAction<Step[]>>
  onUpdate: () => void
  data?: FindStep
  editingId?: number | null
}

const Find = (
  {
    close,
    steps,
    update,
    onUpdate,
    data,
    editingId
  }
  : FindProps) => {
  const [strategy, setStrategy] = useState<string>(data ? data.strategy : "xpath")
  const [until, setUntil] = useState<string>(data ? data.until : "presence")
  const [locator, setLocator] = useState<string>(data ? data.locator : "")

  const canProceed: boolean = !!strategy && !!until && !!locator
  
  const onSubmit = () => {
    if (!!editingId) {
      onEdit()
    } else {
      onAdd()
    }
    onUpdate()
  }
  
  const onAdd = () => {
    const step: FindStep = {
      strategy: strategy,
      until: until,
      locator: locator ? locator : "",
      id: steps.length+1,
      type: StepType.Find
    }
    update([...steps, step])
  }

  const onEdit = () => {
    const step: Step | undefined = steps.find((s: Step) => s.id == editingId)
    if (!!step && step.type == StepType.Find) {
      step.strategy = strategy
      step.until = until
      step.locator = locator
      const updatedSteps = steps.map((s: Step) => s.id === editingId ? step : s)
      update(updatedSteps)
    }
  }
  
  return (
    <div className="action" id="instance">
      <div className="action__header">
        <h2>Find an element</h2>
        <i className="fa-solid fa-xmark" onClick={() => close()}></i>
      </div>
      <div id="rows">
        <div id="row" data-testid="row">
          <label>Strategy</label>
          <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStrategy(e.target.value)}>
            <option value="xpath" selected={strategy === "xpath"}>XPath</option>
            <option value="css" selected={strategy === "css"}>CSS</option>
          </select>
        </div>
        <div id="row" data-testid="row">
          <label>Until</label>
          <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUntil(e.target.value)}>
            <option value="presence" selected={until === "presence"}>Presence of element located</option>
            <option value="visibility" selected={until === "visibility"}>Visibility of element located</option>
          </select>
        </div>
        <div id="row" data-testid="row">
          <label>Locator</label>
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocator(e.target.value)} defaultValue={locator ? locator : undefined}></input>
        </div>
      </div>
      <div className="instance__footer">
        <div 
          className={canProceed ? "footer__ok-button" : "footer__ok-button--disabled"} 
          onClick={canProceed ? () => onSubmit() : () => {}}
        >
          <span>OK</span>
        </div>
      </div>
    </div>
  )
}

export default Find