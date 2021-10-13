export interface ConfigInfo {
  id: string
  title: string
  icon: string
  url: string
  width: number
  height: number
  tile?: {
    patientOnly: boolean
    url: string
  }
  auth?: {
    url: string
  }
  settings: any
}
