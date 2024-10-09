import { useState } from "react"
import { Step } from "../../objects/Step"
import { StepType } from "../../objects/StepType"
import Find from "./StepInstance/Find"

type StepsProps = {
  steps: Step[]
  update: React.Dispatch<React.SetStateAction<Step[]>>
}

const Steps = ({
  steps,
  update
}: StepsProps) => {
  
  const [editingId, setEditingId] = useState<number | null>(null)
  
  const deleteById = (id: number) => {
    const updatedSteps = steps.filter((step: Step) => step.id !== id)
    const refreshedIds = updatedSteps.map((step: Step, index: number) => ({
      ...step,
      id: index + 1
    }));
    update(refreshedIds)
  }
  
  const renderStep = (step: Step) => {
    switch (step.type) {
      case StepType.Find: {
        return (
          <h2>#{step.id} Find element - {step.locator}</h2>
        )
      }
      default: {
        return <></>
      }
    }
  }

  const renderEditStep = (step: Step) => {
    switch (step.type) {
      case StepType.Find: {
        return <Find 
          close={() => setEditingId(null)}
          steps={steps}
          update={update}
          onUpdate={() => setEditingId(null)}
          data={step}
          editingId={editingId}
        />
      }
      default: {
        return <></>
      }
    }
  }
  
  if (steps.length>0) {
    return (
      <div className="steps">
        {steps.map((step: Step) => { 
          if (step.id === editingId) {
            return renderEditStep(step)
          } else {
            return (
              <div id="step" data-testid="step">
                <div id="description">
                  {renderStep(step)}
                </div>
                <div id="options">
                  <i 
                    className="fa-solid fa-pen-to-square" 
                    onClick={() => setEditingId(step.id)}
                  />
                  <i 
                    className="fa-solid fa-trash"
                    onClick={() => deleteById(step.id)}
                  />
                </div>
              </div>
            )
          }
        })}
      </div>
    )
  }
  return null
}

export default Steps