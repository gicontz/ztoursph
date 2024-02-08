export type TTourResponse = {
  id: number;
  tour_slug: string;
  tour_title: string;
  tour_banner_image: string;
  package_details: string;
  price: number;
  discount: number;
  gallery: string[];
};

export type TToursResponse = {
  id: number;
  tour_slug: string;
  tour_title: string;
  package_details: string;
  price: number;
  discount: number;
  tour_banner_image: string;
  location: string;
  reviews: number;
  numberReviews: number;
  gallery: [];
};
