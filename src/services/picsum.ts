const URL = "https://picsum.photos/v2/list";

type Params = {
    limit?: number,
    page?: number,
}
export const getImages = async ({limit = 2, page = 1}: Params = {}) => {
  return fetch(`${URL}?limit=${limit}&page=${page}`)
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });
};


export const getImageUrl = (id: string) => {
  return `https://picsum.photos/id/${id}/300`;
};