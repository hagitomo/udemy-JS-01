// Search Class (レシピ検索)
import Search from './models/Search.js'
// Recipe Class (レシピ詳細取得)
import Recipe from './models/Recipe.js'
// List Class (item list)
import List from './models/List.js'

// searchView
import * as searchView from './views/searchView.js'
// recipeView
import * as recipeView from './views/recipeView.js'
// listView
import * as listView from './views/listView.js'

// DOM elements
import { elements, elementStrings, renderLoader, clearLoader  } from './views/base.js'

/** Global state
 * - Search object
 * - Current recipre object
 * - Shopping list object
 * - Linked recipes
*/
const state = {}

/**
 * Search contollorer
 */
// 検索実行し、UIに表示する
const controlSearch = async () => {
  // 1) viewから 検索クエリ取得
  const query = searchView.getInput()

  if (query) {
    // 2) 新たなsearchオブジェクト作成
    state.search = new Search(query)

    // 3) 検索窓、検索結果を初期化、loadingを表示
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.searchRes)

    try {
      // 4) 検索実行
      await state.search.getResults()

      // 5) 検索結果をUIに表示
      clearLoader()
      searchView.renderResults( state.search.result )
    } catch (err) {
      // エラーメッセージ表示
      searchView.renderErrorSearch()
      console.log(err)
    }
  }
}

// 検索イベント
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  controlSearch()
})

// 検索結果 ページネーション
elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline')

  if( btn ) {
    const goToPage = parseInt(btn.dataset.goto)
    searchView.clearResults()
    searchView.renderResults( state.search.result, goToPage)
  }
})

/**
 * recipe controllorer
 */
const controlRecipe = async () => {
  // urlからid取得
  const id = window.location.hash.slice(1)

  if (id) {
    // UI準備
    recipeView.clearRecipe()
    renderLoader(elements.recipe)

    // 選択されたレシピをハイライト
    if (state.search) searchView.highlightSelected(id);

    // recipe object作成
    state.recipe = new Recipe(id)

    try {
      // recipe data 取得
      await state.recipe.getRecipe()
      state.recipe.parseIngredients()

      // 時間などを算出
      state.recipe.calcTime()
      state.recipe.calcServings()


      // UIに表示
      clearLoader()
      recipeView.renderRecipe(state.recipe)
    } catch(err) {
      recipeView.renderErrorRecipe()
      console.log('recipe process err')
    }
  }
}

// レシピ検索結果をクリックするとhashが変更される
// hashの変更, loadを監視
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe))


/**
 * LIST CONTROLLER
 */

const controlList = () => {
  // 買い物リストに始めて追加された場合
  if (!state.list) {
    state.list = new List()
  }
  // レシピの材料を買い物リストに追加
  state.recipe.ingredients.forEach( el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient)
    // uiに描画
    listView.renderItem(item)
  } )
}

// 買い物リストの削除、増減
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid

  // 削除btnクリック
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // stateから該当アイテム削除
    state.list.deleteItem(id)

    // UIからアイテム削除
    listView.deleteItem(id)

  //増減ボタン
  } else if ( e.target.matches('.shopping__count-value') ) {
    const val = parseFloat(e.target.value, 10)
    state.list.updateCount(id, val)
  }
})


// レシピ内の増減ボタンをクリック
elements.recipe.addEventListener('click', e => {
  // 押した要素のクラスが'btn-decrease' または 'btn-decrease'を親に持つ要素の場合、servingsが1以上の場合
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if ( state.recipe.servings > 1 ) {
      state.recipe.updateServings('dec')
      recipeView.updateServingsIngredients(state.recipe)
    }

    // 押した要素のクラスが'btn-increase' または 'btn-increase'を親に持つ要素の場合
  } else if ( e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc')
    recipeView.updateServingsIngredients(state.recipe)

    // shoping listに追加btnを押した場合
  } else if ( e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList()
  }
})


// shopinglist アイテム
const list = new List()

