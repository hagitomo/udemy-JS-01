import { elements } from './base.js'

// 検索窓の入力値取得
export const getInput = () => {
  return elements.searchInput.value
}

// 検索窓の初期化
export const clearInput = () => {
  elements.searchInput.value = ''
}

// 検索結果の初期化
export const clearResults = () => {
  // 検索リストの中身をカラに
  elements.searchResList.innerHTML = ''
  // 検索リストのボタンも削除
  elements.searchResPages.innerHTML= ''
}

// レシピ詳細に選択されたリスト ハイライト表示
export const highlightSelected = id => {
  const resultArr = Array.from(document.querySelectorAll('.results__link'))
  resultArr.forEach(el => {
    el.classList.remove('results__link--active')
  })
  document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active')
}

// タイトルの文字数制限
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = []
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur)
      }
      return acc + cur.length
    }, 0)
    // 文字数以内の単語を連結して返す
    return `${newTitle.join(' ')}...`
  }
  return title
}

// レシピをrendering
const renderRecipe = ( recipe  => {
  const markup =
  `
  <li>
    <a class="results__link" href="#${recipe.recipe_id }">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
  </li>
  `
  elements.searchResList.insertAdjacentHTML('beforeend', markup)
})

// リストに表示するボタン作成
const createButton = ( page, type ) => {
  return `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1 } >
    <span>Page ${type === 'prev' ?  page - 1 : page + 1 }</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
    </svg>
  </button>
  `
}

// ボタンをレンダリング
const renderButtons = ( page, numResults, resPerPage ) => {
  const pages = Math.ceil( numResults / resPerPage ) // 全体のページ数算出

  let button
  if ( page === 1 && pages > 1 ) {
    button = createButton(page, 'next')

  } else if ( page < pages ) {
    button =
    `
    ${createButton(page, 'prev')}
    ${createButton(page, 'next')}
    `
  } else if ( page === pages && pages > 1 ) {
    button = createButton(page, 'prev')
  }

  elements.searchResPages.insertAdjacentHTML('beforeend', button)
}

// 検索結果をUIにrendering, paginationも表示
export const renderResults = ( recipes, page = 1, resPerPage = 10 ) => {
  const start =( page - 1 ) * resPerPage
  const end = page * resPerPage

  recipes.slice( start, end ).forEach( renderRecipe )
  renderButtons( page, recipes.length, resPerPage )
}

// エラー時の表示
export const renderErrorSearch = ( ()  => {
  const markup =
  `
  <li>
    <p> soory somthing wrong... cant read search result</p>
  </li>
  `
  elements.searchResList.insertAdjacentHTML('beforeend', markup)
})
