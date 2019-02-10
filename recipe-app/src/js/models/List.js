import uniqid from 'uniqid'

export default class List {
  constructor() {
    this.items = []
  }

  // アイテム追加
  addItem ( count, unit, ingredient ) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    }

    this.items.push(item)
    return item
  }

  // アイテム削除
  deleteItem( id ) {
    // idをもつアイテムのindex
    const index = this.items.findIndex( el => el.id === id )

    this.items.splice(index, 1)
  }

  // カウントを更新
  updateCount (id, newCount ) {
    const item = this.items.find(el => el.id === id)
    item.count = newCount
  }
}
