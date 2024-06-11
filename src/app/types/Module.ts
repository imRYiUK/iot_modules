
export enum ModuleStatus {
  UP, DOWN
}

export interface Module {
  id: string,
  secretKey: string,
  status: ModuleStatus,
  name ?: string,
  broker ?: string,
  topic ?: string
}
