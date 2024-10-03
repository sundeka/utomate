import { useState } from "react"
import { Step } from "../../objects/Step"
import { StepType } from "../../objects/StepType"
import Find from "../Steps/StepInstance/Find"

type InsertProps = {
  steps: Step[]
  update: React.Dispatch<React.SetStateAction<Step[]>>
}

enum InsertionPhase {
  None,
  Selecting,
  Committing
}

const Insert = ({
  steps,
  update
}: InsertProps) => {
  const [phase, setPhase] = useState<InsertionPhase>(InsertionPhase.None)
  const [selection, setSelection] = useState<StepType | undefined>(undefined)
  
  const handleActionSelection = (selection: StepType) => {
    setSelection(selection)
    setPhase(InsertionPhase.Committing)
  }

  const handleGoBackFromCommitting = () => {
    setSelection(undefined)
    setPhase(InsertionPhase.Selecting)
  }

  const handleCommit = () => {
    setPhase(InsertionPhase.None)
    setSelection(undefined)
  }

  switch (phase) {
    case InsertionPhase.None: {
      return (
        <div className="action" id="new" onClick={() => setPhase(InsertionPhase.Selecting)}>
          <i className="fa-solid fa-plus"></i>
        </div>
      )
    }
    case InsertionPhase.Selecting: {
      return (
        <div className="action" id="select">
          <div className="action--select__header">
            <h2>Select an action</h2>
            <i className="fa-solid fa-xmark" id="close" onClick={() => setPhase(InsertionPhase.None)}></i>
          </div>
          <div className="action--select__options">
            <div 
              className="options__item" 
              onClick={() => handleActionSelection(StepType.Find)}
              id={StepType.Find}
            >
              <p>Find an element</p>
            </div>
            <div 
              className="options__item" 
              onClick={() => handleActionSelection(StepType.Click)}
              id={StepType.Click}
            >
              <p>Click an element</p>
            </div>
            <div 
              className="options__item" 
              onClick={() => handleActionSelection(StepType.Open)}
              id={StepType.Open}
            >
              <p>Open a website</p>
            </div>
            <div 
              className="options__item" 
              onClick={() => handleActionSelection(StepType.Loop)}
              id={StepType.Loop}
            >
              <p>Loop</p>
            </div>
          </div>
        </div>
      )
    }
    case InsertionPhase.Committing: {
      switch (selection) {
        case StepType.Find: { return <Find close={handleGoBackFromCommitting}/> }
        case StepType.Click: { return <></> }
        case StepType.Open: { return <></> }
        case StepType.Loop: { return <></> } 
        default: { return <></> }
      }
    }
  }
}

export default Insert