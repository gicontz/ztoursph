import { TTourResponse } from '@app/modules/tours/types';
import { handleResponse } from '@app/utils/helpers';

const getTours = () => {
  return fetch('/api/tours', { method: 'GET' })
    .then(res => handleResponse(res))
    .then(res => res.data)
    .catch(err => console.log(err));
}

const getTourBySlug = (slug): Promise<TTourResponse> => {
  return fetch(`/api/tours/info?tour_slug=${slug}`, { method: 'GET' })
    .then(res => handleResponse(res))
    .then(res => res.data)
    .catch(err => console.log(err));
}

export {
  getTours,
  getTourBySlug,
}