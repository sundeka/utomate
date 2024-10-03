import { Step } from "../../../objects/Step"
import { StepType } from "../../../objects/StepType"

type StepInstanceProps = {
  step: Step
}

const StepInstance = ({
  step
}: StepInstanceProps) => {
  switch (step.type) {
    case StepType.Find: {
      return <p>Working!!!</p>
    }
    default: {
      return null
    }
  }
}

export default StepInstance