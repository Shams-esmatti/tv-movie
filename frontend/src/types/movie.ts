export interface Genre {
  _id: string;
  name: string;
}

export interface Movie {
  _id: string;
  title: string;
  genre: string | Genre; // could be ID or populated genre object
  numberInStock: number;
  dailyRentalRate: number;
}
