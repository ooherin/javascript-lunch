import BaseComponent from '@/components/BaseComponent';

type SelectBoxProps = {
  optionValues: string[];
  optionTexts: string[];
  name: string;
  classList: string[];
  id: string;
};
class SelectBox extends BaseComponent {
  #optionValues;
  #optionTexts;
  #name;
  #classList;
  #id;

  constructor({ optionValues, optionTexts, name, classList, id }: SelectBoxProps) {
    super();
    this.#optionValues = optionValues;
    this.#optionTexts = optionTexts;
    this.#name = name;
    this.#classList = classList;
    this.#id = id;
  }

  render() {
    const $selectTag = this.#makeSelectTag();
    this.replaceWith($selectTag);
  }

  #makeSelectTag() {
    const selectTag = document.createElement('select');
    selectTag.classList.add(...this.#classList);
    selectTag.id = this.#id;
    selectTag.name = this.#name;
    selectTag.append(this.#makeOptionTags());
    return selectTag;
  }

  #makeOptionTags() {
    const fragment = new DocumentFragment();
    this.#optionValues.forEach((option, index) => {
      const optionTag = document.createElement('option');
      optionTag.value = option;
      optionTag.textContent = this.#optionTexts[index];
      fragment.append(optionTag);
    });
    return fragment;
  }
}

export default SelectBox;

customElements.define('select-box', SelectBox);
