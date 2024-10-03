import { StepType } from "./StepType"

export type Step = {
  id: number
  type: StepType
}

export interface FindStep extends Step {
  strategy: string //muuta enum
  until: string, // muuta enum
  locator: string
}