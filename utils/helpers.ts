
export const handleResponse = (response: Response) => {
      try {
          const data = response.json()
          return data;
      } catch(e) {
          return Promise.reject({ status: response.status, text: response.statusText });
      }
}