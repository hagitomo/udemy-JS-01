import axios from  'axios'
import * as config from '../../config/config.js'

// apiから検索結果取得
export default class Search {
  constructor(query) {
    this.query = query
  }
  async getResults( ) {
    const food2fork = 'https://www.food2fork.com/api/search'

    try {
      const res = await axios(`${food2fork}?key=${config.apikey}&q=${this.query}`)
      // 結果を Searchクラスのthis.resultに保存
      this.result = res.data.recipes
    } catch (err) {
      console.log(err)
    }
  }
}


