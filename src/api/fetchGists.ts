
export interface GistOwner {
    avatar_url: string;
  }
  
  export interface GistFile {
    [key: string]: {
      filename: string;
    };
  }
  
  //Note: added types for only what needs for this project..
  export interface Gist {
    id: string;
    owner: GistOwner;
    files: GistFile;
    since: string;
  }
  
  const GIST_API_URL = 'https://api.github.com/gists/public';

  //Note: Ideally, this would be using axios feature to call the api, just for this project purpose added a fetch call like this. 
  
  export const fetchGists = async (since: string, page: number = 1, perPage: number = 20): Promise<Gist[]> => {
    try {
      const response = await fetch(`${GIST_API_URL}?since=${since}&per_page=${perPage}&page=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Gist[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching gists:', error);
      throw error;
    }
  };
  