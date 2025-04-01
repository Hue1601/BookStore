export interface Voucher {
  _id: string;
  code: string,
  condition:string,
  type: boolean,
  value: number,
  maxValue:number,
  quantity:number,
  startDate: Date,
  endDate: Date,
  status: boolean
}

