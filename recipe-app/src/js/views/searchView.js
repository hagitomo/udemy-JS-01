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
  elements.searchResList.innerHTML = ''
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

// 検索結果をUIにrendering
export const renderResults = ( recipes ) => {
  recipes.forEach( renderRecipe )
}
