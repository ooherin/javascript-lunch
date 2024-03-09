import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import BasicModal from '../BasicModal/BasicModal';
import SelectBox from '../SelectBox/SelectBox';
import BaseComponent from '../BaseComponent';
import BasicButton from '../BasicButton/BasicButton';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import { Category, IRestaurant } from '@/types/Restaurant';
import validator from '@/utils/validator';

class NewRestaurantModal extends BaseComponent {
  #form;
  #title;

  constructor() {
    super();
    this.#form = document.createElement('form');
    this.#title = document.createElement('h2');

    this.#title.classList.add('modal-title', 'text-title');
    this.#title.textContent = '새로운 음식점';
  }

  render() {
    this.#makeForm();

    const $fragment = new DocumentFragment();
    $fragment.append(this.#title);
    $fragment.append(this.#form);
    this.append(new BasicModal($fragment));
  }

  #makeForm() {
    this.#makeCategorySelectBox();
    this.#makeNameInput();
    this.#makeDistanceSelectBox();
    this.#makeDescriptionTextArea();
    this.#makeLinkInput();
    this.#makeButtons();

    this.#submitForm();
    this.closeModal();
  }

  #makeCategorySelectBox() {
    const $categorySelectBox = document.createElement('div');
    $categorySelectBox.classList.add('form-item', 'form-item--required', 'category-select');

    const $categoryLabel = document.createElement('label');
    $categoryLabel.setAttribute('for', 'category text-caption');
    $categoryLabel.textContent = '카테고리';
    $categorySelectBox.append($categoryLabel);

    const CATEGORIES_KEYS_REQUIRED = ['선택해주세요', ...CATEGORIES_KEYS];

    const $categorySelect = new SelectBox({
      optionValues: CATEGORIES_KEYS_REQUIRED,
      name: 'category',
      classList: [],
      id: 'category',
    });

    $categorySelectBox.append($categorySelect);
    const $errorBox = this.#makeErrorMessage('카테고리는 필수 입력입니다.', 'category-error');
    $categorySelectBox.append($errorBox);

    this.#form.append($categorySelectBox);
  }

  #makeErrorMessage(text: string, id: string) {
    const $errorBox = document.createElement('div');
    $errorBox.id = id;
    $errorBox.classList.add('error', 'hidden');
    $errorBox.textContent = text;
    return $errorBox;
  }

  #makeNameInput() {
    const $nameInputBox = document.createElement('div');
    $nameInputBox.classList.add('form-item', 'form-item--required', 'name-input-box');
    $nameInputBox.innerHTML = `
    <label for="name text-caption">이름</label>
     <input type="text" name="name" id="name" max="10"/>
    `;
    this.#form.append($nameInputBox);
    const $errorBox = this.#makeErrorMessage('이름값은 필수 입력입니다.', 'name-error');
    $nameInputBox.append($errorBox);
  }

  #makeDistanceSelectBox() {
    const $distanceSelection = document.createElement('div');
    $distanceSelection.classList.add('form-item', 'form-item--required', 'distance-select');
    $distanceSelection.innerHTML = `<label for="distance text-caption">거리(도보 이동 시간) </label>  
      `;

    const DISTANCES_REQURIED = [
      '선택해주세요',
      ...CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
    ];
    $distanceSelection.append(
      new SelectBox({
        optionValues: DISTANCES_REQURIED,
        name: 'distance',
        classList: [],
        id: '',
      }),
    );

    const $errorBox = this.#makeErrorMessage('거리 값은 필수 입력입니다.', 'distance-error');
    $distanceSelection.append($errorBox);

    this.#form.append($distanceSelection);
  }

  #makeDescriptionTextArea() {
    const $descriptionTextBox = document.createElement('div');
    $descriptionTextBox.classList.add('form-item');
    $descriptionTextBox.innerHTML = `
              <label for="description text-caption">설명</label>
              <textarea name="description" id="description" cols="30" rows="5" max="300"></textarea>
              <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
`;

    this.#form.append($descriptionTextBox);
  }

  #makeLinkInput() {
    const $linkTextBox = document.createElement('div');
    $linkTextBox.classList.add('form-item');
    $linkTextBox.innerHTML = ` <label for="link text-caption">참고 링크</label>
                <input type="text" name="link" id="link" />
                 <span class="help-text text-caption"> 매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>`;
    const $errorBox = this.#makeErrorMessage('유효한 링크를 입력해주세요', 'link-error');
    $linkTextBox.append($errorBox);

    this.#form.append($linkTextBox);
  }

  #makeButtons() {
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');

    const cancelButton = new BasicButton({
      variant: 'secondary',
      textContent: '취소하기',
      type: 'reset',
      clickEvent: this.closeModal,
    });
    const addButton = new BasicButton({
      variant: 'primary',
      textContent: '추가하기',
      type: 'submit',
      clickEvent: () => {},
    });

    $buttonBox.append(cancelButton);
    $buttonBox.append(addButton);

    this.#form.append($buttonBox);
  }

  // #validateRequiredValues(
  //   category: RequiredCategoriesKeys,
  //   distance: RequiredDistanceKeys,
  //   name: string | null,
  // ) {
  //   const isNotValidCategory = category === '선택해주세요';
  //   const isNotValidDistance = Number.isNaN(distance);
  //   const isNotValidName = !name;
  //   if (isNotValidCategory) {
  //     document.querySelector('#category-error')?.classList.remove('hidden');
  //   }
  //   if (isNotValidDistance) {
  //     document.querySelector('#distance-error')?.classList.remove('hidden');
  //   }
  //   if (isNotValidName) {
  //     document.querySelector('#name-error')?.classList.remove('hidden');
  //   }
  //   if (link && !validator.isValidLink(link)) {
  //     document.querySelector('#link-error')?.classList.remove('hidden');
  //   }

  //   return isNotValidCategory || isNotValidDistance || isNotValidName;
  // }

  #validateCategory(category: string) {
    if (!validator.isValidCategory(category)) {
      document.querySelector('#category-error')?.classList.remove('hidden');
      return false;
    }
    return true;
  }

  #validateDistance(distance: number) {
    if (!validator.isValidDistance(distance)) {
      document.querySelector('#distance-error')?.classList.remove('hidden');
      return false;
    }
    return true;
  }

  #validateName(name: string | null) {
    if (!validator.isValidName(name)) {
      document.querySelector('#name-error')?.classList.remove('hidden');
      return false;
    }
    return true;
  }

  #validateLink(link: string) {
    if (!validator.isValidLink(link)) {
      document.querySelector('#link-error')?.classList.remove('hidden');
    }
  }

  #validateValues({
    category,
    distance,
    name,
    link,
  }: {
    category: string;
    distance: number;
    name: string;
    link: string;
  }) {
    this.#validateCategory(category);
    this.#validateDistance(distance);
    this.#validateName(name);
    this.#validateLink(link);

    return (
      this.#validateCategory(category) ||
      this.#validateDistance(distance) ||
      this.#validateName(name)
    );
  }

  #submitForm() {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#hideErrorMessage();
      const values = this.#getValues();
      const { category, name, distance, description, link } = values;

      if (this.#validateValues(values)) return;

      const newRestaurant: IRestaurant = {
        name,
        distance,
        category: category as Category,
        ...(description && { description }),
        ...(link && { link }),
      };
      const DBService = new RestaurantDBService();
      DBService.add(newRestaurant);

      this.#rerenderByFilter();
      this.closeModal();
    });
  }

  closeModal() {
    this.#hideErrorMessage();
    this.classList.remove('modal--open');
    BasicModal.blockModalBodyScroll();
  }

  #hideErrorMessage() {
    document.querySelectorAll('.error').forEach((el) => {
      el.classList.add('hidden');
    });
  }

  #getValues() {
    const name = (this.#form.elements.namedItem('name') as HTMLInputElement).value;
    const distance = Number(
      (this.#form.elements.namedItem('distance') as HTMLSelectElement).value.slice(0, -3),
    );
    const category = (this.#form.elements.namedItem('category') as HTMLSelectElement).value;
    const description = (this.#form.elements.namedItem('description') as HTMLInputElement).value;
    const link = (this.#form.elements.namedItem('link') as HTMLInputElement).value;

    return { name, distance, category, description, link };
  }

  #rerenderByFilter() {
    const selectElement = document.querySelector('.restaurant-filter-container');
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    selectElement?.dispatchEvent(event);
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurantmodal', NewRestaurantModal);
