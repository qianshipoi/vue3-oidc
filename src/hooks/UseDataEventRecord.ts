import { useAuthStore } from "../stores/auth";

export class DataEventRecord {
  id = 0;
  name = '';
  description = '';
  timestamp = '';
}

export const useDataEventRecord = () => {
  const _url: string = "https://localhost:44390/api/DataEventRecords/";
  const authStore = useAuthStore();

  const getHeaders = (headers?: HeadersInit) => {
    const accessToken = authStore.getAccessToken();
    headers = headers || {};
    if (accessToken) {
      headers = {
        ...headers,
        "Authorization": `Bearer ${accessToken}`,
      }
      return headers;
    }
  }
  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'HEAD' | 'PATCH';
  type HttpRequestConfig = {
    headers: HeadersInit;
  }

  const request = async <TResponse>(url: string, method: HttpMethod, data?: any, config?: HttpRequestConfig): Promise<TResponse> => {
    const headers = getHeaders(config?.headers);
    if (!headers) {
      throw new Error("No access token found.");
    }

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Request failed: " + response.statusText);
    }
  }


  const getDataEventRecords = async (): Promise<DataEventRecord[]> => {
    return await request<DataEventRecord[]>(_url, "GET");
  }

  const getDataEventRecordById = async (id: number): Promise<DataEventRecord> => {
    return await request<DataEventRecord>(_url + id, "GET");
  }

  const addDataEventRecord = async (data: any): Promise<any> => {
    return await request<DataEventRecord>(_url, "POST", data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  const updateDataEventRecord = async (data: any): Promise<any> => {

    return await request<DataEventRecord>(_url + data.id, "PUT", data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  const deleteDataEventRecord = async (id: number): Promise<any> => {
    return await request<DataEventRecord>(_url + id, "DELETE");
  }

  return {
    getDataEventRecords,
    getDataEventRecordById,
    addDataEventRecord,
    updateDataEventRecord,
    deleteDataEventRecord
  }
}
