import type { Category, IRestaurant, Distance } from '../../types/Restaurant';

class Restaurant implements IRestaurant {
  name: string;
  distance: Distance;
  category: Category;
  isFavorite: boolean;
  description?: string;
  link?: string;
  id: number;

  constructor(restaurantArgs: IRestaurant) {
    this.name = restaurantArgs.name;
    this.distance = restaurantArgs.distance;
    this.category = restaurantArgs.category;
    this.description = restaurantArgs.description;
    this.link = restaurantArgs.link;
    this.isFavorite = restaurantArgs.isFavorite;
    this.id = restaurantArgs.id;
  }

  get() {
    const result: IRestaurant = {
      name: this.name,
      distance: this.distance,
      category: this.category,
      isFavorite: this.isFavorite,
      id: this.id,
    };
    if (this.description) {
      result.description = this.description;
    }
    if (this.link) {
      result.link = this.link;
    }
    return result;
  }

  changeIsFavoriteFalse() {
    this.isFavorite = false;
  }

  changeIsFavoriteTrue() {
    this.isFavorite = true;
  }
}
export default Restaurant;
