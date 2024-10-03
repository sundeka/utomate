import { Step } from "../../objects/Step"
import StepInstance from "./StepInstance/StepInstance"

type StepsProps = {
  steps: Step[]
}

const Steps = ({
  steps
}: StepsProps) => {
  if (steps.length>0) {
    return (
      <div className="steps">
        {steps.map((step: Step) => { return <StepInstance step={step} /> })}
      </div>
    )
  }
  return null
}

export default Steps