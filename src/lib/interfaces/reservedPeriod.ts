import { DateStatus } from './grid.interface'

export interface ReservedPeriod {
  start: string;
  end: string;
  status: DateStatus;
  data: string;
  displayText?:React.ReactNode;
  onHoverToolTip?: React.ReactNode;
}
