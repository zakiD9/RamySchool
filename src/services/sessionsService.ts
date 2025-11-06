import api from "@/lib/api";

export interface SessionRequest {
  type: number; 
  dateSession: string; 
  price: number;
  groupId: number;
}

export interface SessionResponse {
  id: number;
  type: number;
  dateSession: string;
  price: number;
  groupName: string;
  teacherName: string;
}

const SessionService = {
  
  async getAll(): Promise<SessionResponse[]> {
    const res = await api.get("/Sessions");
    return res.data;
  },

  
  async getById(id: number): Promise<SessionResponse> {
    const res = await api.get(`/Sessions/${id}`);
    return res.data;
  },

  
  async create(data: SessionRequest): Promise<SessionResponse> {
    const res = await api.post("/Sessions", data);
    return res.data;
  },

  
  async update(id: number, data: SessionRequest): Promise<SessionResponse> {
    const res = await api.put(`/Sessions/${id}`, data);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/Sessions/${id}`);
  },
};

export default SessionService;
