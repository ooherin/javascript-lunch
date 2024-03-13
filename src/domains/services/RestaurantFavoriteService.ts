import { $ } from '@/utils/DOM';
import RestaurantCollection from '../entities/RestaurantCollection';
import RestaurantDBService from './RestaurantDBService';

class RestaurantFavoriteService {
  #restaurantDBService;
  #restaurantCollection;

  constructor() {
    this.#restaurantDBService = new RestaurantDBService();
    this.#restaurantCollection = new RestaurantCollection([]);
  }

  rerenderByFilter() {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    $('.restaurant-filter-container').dispatchEvent(event);
  }
}

export default RestaurantFavoriteService;
