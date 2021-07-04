import axios from "axios";

async function callMockServer({ type, data, url }) {
  switch (type.toLowerCase()) {
    case "get": {
      try {
        const response = await axios.get(url);
        return response.status === 200
          ? { response, error: false }
          : new Error("get unsuccessful");
      } catch (error) {
        return { response: null, error: true };
      }
    }
    case "post": {
      try {
        const response = await axios.post(url, data);
        return response.status === 201
          ? { response, error: false }
          : new Error("post unsuccessful");
      } catch (error) {
        return { response: null, error: true };
      }
    }
    case "put": {
      try {
        const response = await axios.put(url, data);
        return response.status === 200
          ? { response, error: false }
          : { response, error: true };
      } catch (error) {
        return { response: null, error: true };
      }
    }
    case "delete": {
      try {
        const response = await axios.delete(url, data);
        return response.status === 200
          ? { response, error: false }
          : { response, error: true };
      } catch (error) {
        return { response: null, error: true };
      }
    }
    default:
      return { response: null, error: false };
  }
}

export default callMockServer;
