const URL = "https://picsum.photos/v2/list";

export type PicsumImage = {
  id: string;
  author: string;
  download_url: string;
  url: string;
  height: number;
  width: number;
};

type Params = {
  limit?: number,
  page?: number,
}

export const getImages = async ({limit = 3, page = 1}: Params = {}): Promise<PicsumImage[]> => {
  return fetch(`${URL}?limit=${limit}&page=${page}`)
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });
};


export const getImageUrl = (id: string) => {
  return `https://picsum.photos/id/${id}/300`;
};