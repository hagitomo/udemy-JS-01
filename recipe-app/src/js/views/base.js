export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list'),
  searchResPages: document.querySelector('.results__pages'),
  searchResBtnNext: document.querySelector('.results__btn--next'),
  searchResBtnPrev: document.querySelector('.results__btn--prev')
}

export const elementStrings = {
  loader: 'loader'
}

// loadingアニメーション表示
export const renderLoader = parent => {
  const loader =
  `
  <div class="${elementStrings.loader }">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `
  parent.insertAdjacentHTML('afterbegin', loader)
}

// loadingアニメーション非表示
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`)
  if (loader) {
    loader.parentElement.removeChild(loader)
  }
}
