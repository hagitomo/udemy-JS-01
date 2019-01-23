// Searchオブジェクト
import Search from './models/Search.js'
// searchView
import * as searchView from './views/searchView.js'
// DOM elements
import { elements, elementStrings, renderLoader, clearLoader  } from './views/base.js'

/** Global state
 * - Search object
 * - Current recipre object
 * - Shopping lisr object
 * - Linked recipes
*/
const state = {}


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

    // 4) 検索実行
    await state.search.getResults()

    // 5) 検索結果をUIに表示
    clearLoader()
    searchView.renderResults( state.search.result )
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
