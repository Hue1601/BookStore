import axios from "axios";

class DiscountService{
   private  BASE_URL= 'http://localhost:5000/discount'

  async getAll(){
     const reponse = await axios.get(`${this.BASE_URL}`)
    return reponse
  }
  async getById(id: string) {
     const reponse = await axios.get(`${this.BASE_URL}/${id}`);
     return reponse.data
  }
  async update(id: string,name:string,discountRate:number,startDate:Date,endDate:Date,status:string){
     const reponse = await axios.put(`${this.BASE_URL}/${id}`,{
       name,
       discountRate,
       startDate,
       endDate,
       status
     })
    return reponse
  }
  async add(name:string,discountRate:number,startDate:Date,endDate:Date,status:string){
    const reponse = await axios.post(`${this.BASE_URL}/add`,{
      name,
      discountRate,
      startDate,
      endDate,
      status
    })
    return reponse
  }
}
export const discountService = new DiscountService();
