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
  status: string
}
export interface Discount {
  _id: string,
  name: string,
  discountRate:number,
  startDate: Date,
  endDate: Date,
  status:string
}
