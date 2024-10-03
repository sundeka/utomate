import { StepType } from "./StepType"

export type Step = FindStep | LoopStep

export type FindStep = {
  id: number
  type: StepType.Find
  strategy: string //muuta enum
  until: string, // muuta enum
  locator: string
}

export type LoopStep = {
  id: number
  type: StepType.Loop
  method: string // muuta enum
  target: string
  steps: Step[]
}