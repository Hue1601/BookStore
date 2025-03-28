import axios from "axios";

class AttributeService {
  private BASE_URL = "http://localhost:5000/attribute";
  async getAuthor(): Promise<any> {
    const response = await axios.get(`${this.BASE_URL}/author`)
    return response.data;
  }

  async getCategory(): Promise<any> {
    const response = await axios.get(`${this.BASE_URL}/category`)
    return response.data;
  }

  async getPublisher(): Promise<any> {
    const response = await axios.get(`${this.BASE_URL}/publisher`)
    return response.data;
  }

  async addAuthor(name: string): Promise<any> {
    const response = await axios.post(`${this.BASE_URL}/author`, {
      name
    })
    return response;
  }

  async addCategory(name: string): Promise<any> {
    const response = await axios.post(`${this.BASE_URL}/category`, {
      name
    })
    return response;
  }

  async addPublisher(name: string): Promise<any> {
    const response = await axios.post(`${this.BASE_URL}/publisher`, {
      name
    })
    return response;
  }
  async findAuthorById(id: string): Promise<any> {
    const response = await axios.get(`${this.BASE_URL}/author/${id}`)
    return response.data;
  }
  async findCategoryById(id: string): Promise<any> {
    const response = await axios.get(`${this.BASE_URL}/category/${id}`)
    return response.data;
  }
  async findPublisherById(id: string): Promise<any> {
    const response = await axios.get(`${this.BASE_URL}/publisher/${id}`)
    return response.data;
  }

  async updateAuthor(id: string,name:string): Promise<any> {
    const response = await axios.put(`${this.BASE_URL}/author/${id}`, {
      name
    })
    return response;
  } async updateCategory(id: string,name:string): Promise<any> {
    const response = await axios.put(`${this.BASE_URL}/category/${id}`, {
      name
    })
    return response;
  } async updatePublisher(id: string,name:string): Promise<any> {
    const response = await axios.put(`${this.BASE_URL}/publisher/${id}`, {
      name
    })
    return response;
  }

}

export const attributeService = new AttributeService();
