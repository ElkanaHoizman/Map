import axios from "axios";

const apiClient = axios.create({
  //   baseURL:
  //     "https://vanitysoft-boundaries-io-v1.p.rapidapi.com/reaperfire/rest/v1/public/boundary",
  headers: {
    // "x-rapidapi-key": "ab7ca666c3msh77e4a27effe0a01p17d405jsn2fb379713f48",
    "x-rapidapi-key": "1bfcc6c964msh83d4f1206ce0dcbp15e12cjsne095ec132bb6",

    "x-rapidapi-host": "vanitysoft-boundaries-io-v1.p.rapidapi.com",
  },
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    window.location.href = "/";
    alert(error.message);
    return;
    return Promise.resolve(true);
  }
);
export default {
  async getData(query: string) {
    try {
      const response = await apiClient.get(
        `https://vanitysoft-boundaries-io-v1.p.rapidapi.com/reaperfire/rest/v1/public/boundary?zipcode=${query}`
      );

      return response.data;
    } catch (error) {
      // console.error("Error fetching items:", error);
      //   throw error;
    }
  },
};
