import axios from "axios";

class AttributeService {
  async getAuthor(): Promise<any> {
    const response = await axios.get("http://localhost:5000/attribute/author")
    console.log("aa"+ JSON.stringify(response.data));
    return response.data;
  }
  async getCategory(): Promise<any> {
    const response = await axios.get("http://localhost:5000/attribute/category")
    return response.data;
  }
  async getPublisher(): Promise<any> {
    const response = await axios.get("http://localhost:5000/attribute/publisher")
    return response.data;
  }
}
export const attributeService = new AttributeService();
