import RestaurantDBService from '../../src/domains/services/RestaurantDBService';
import { IRestaurant } from '../../src/types/Restaurant';

describe('음식점 DB 서비스 테스트', () => {
  const RESTAURANTS_DB_TEST_KEY = 'restaurants_test';

  let restaurants: IRestaurant[] = [];

  beforeEach(() => {
    cy.stub(localStorage, 'getItem', () => JSON.stringify(restaurants));
    cy.stub(localStorage, 'setItem', (_, restaurantJSON) => {
      restaurants = JSON.parse(restaurantJSON);
    });
    cy.stub(localStorage, 'removeItem', () => {
      restaurants = JSON.parse('[]');
    });
  });

  it('새로운 음식점을 추가했을 때, 로컬 스토리지에 잘 반영된다.', () => {
    const NEW_RESTAURANT: IRestaurant = {
      name: '친친',
      distance: 10,
      category: '중식',
      description: '게살볶음밥',
    };
    const restaurantDBService = new RestaurantDBService();

    restaurantDBService.add(NEW_RESTAURANT);

    expect(JSON.parse(localStorage.getItem(RESTAURANTS_DB_TEST_KEY) || '[]')).to.deep.equal([
      NEW_RESTAURANT,
    ]);
  });

  it('get했을 때, 기존에 로컬스토리지에 있던 데이터를 잘 가져온다.', () => {
    const restaurantDBService = new RestaurantDBService();

    const RESTAURANT_FIRST: IRestaurant = {
      name: '꺼벙이 김밥',
      distance: 10,
      category: '한식',
      description: '김밥 최저',
    };

    const RESTAURANT_SECOND: IRestaurant = {
      name: '얌샘 김밥',
      distance: 5,
      category: '한식',
      description: '게살볶음밥',
    };

    localStorage.setItem(
      RESTAURANTS_DB_TEST_KEY,
      JSON.stringify([RESTAURANT_FIRST, RESTAURANT_SECOND]),
    );

    expect(JSON.parse(restaurantDBService.get() || '[]')).to.deep.equal([
      RESTAURANT_FIRST,
      RESTAURANT_SECOND,
    ]);
  });
});
