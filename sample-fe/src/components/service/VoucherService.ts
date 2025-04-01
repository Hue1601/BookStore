import axios from "axios";

class VoucherService {
  private ROOT_API = 'http://localhost:5000/voucher'

  async getVoucher() {
    const res = await axios.get(`${this.ROOT_API}`);
    return res;
  }

  async getVoucherById(id: string) {
    const res = await axios.get(`${this.ROOT_API}/${id}`);
    return res.data;
  }

  async updateVoucher(id: string,
                      code: string,
                      condition: string,
                      type: boolean,
                      value: number,
                      maxValue: number,
                      quantity: number,
                      startDate: Date,
                      endDate: Date,
                      status: string
  ) {
    const res = await axios.put(`${this.ROOT_API}/${id}`, {
      code,
      condition,
      type,
      value,
      maxValue,
      quantity,
      startDate,
      endDate,
      status
    });
    return res;
  }
  async addVoucher(code: string,
                      condition: string,
                      type: boolean,
                      value: number,
                      maxValue: number,
                      quantity: number,
                      startDate: Date,
                      endDate: Date,
                      status: string
  ) {
    const res = await axios.post(`${this.ROOT_API}/add`, {
      code,
      condition,
      type,
      value,
      maxValue,
      quantity,
      startDate,
      endDate,
      status
    });
    return res;
  }
}

export const voucherService = new VoucherService();
