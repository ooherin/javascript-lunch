import BaseComponent from '@/components/BaseComponent';
class SelectBox extends BaseComponent {
  #optionValues;
  #name;

  constructor(optionValues: string[], name: string) {
    super();
    this.#optionValues = optionValues;
    this.#name = name;
  }

  render() {
    const selectTag = this.#makeSelectTag();
    this.outerHTML = selectTag.outerHTML; // outerHTML
    //this.append(selectTag);
  }

  #makeSelectTag() {
    const selectTag = document.createElement('select');
    selectTag.classList.add('restaurant-filter');
    selectTag.name = this.#name;
    selectTag.id = `${this.#name}-filter`;

    selectTag.append(this.#makeOptionTags());
    return selectTag;
  }

  #makeOptionTags() {
    const fragment = new DocumentFragment();
    this.#optionValues.forEach((category) => {
      const optionTag = document.createElement('option');
      optionTag.value = category;
      optionTag.textContent = category;
      fragment.append(optionTag);
    });
    return fragment;
  }
}

export default SelectBox;

customElements.define('select-box', SelectBox);
