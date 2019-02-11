export default class Likes {
  constructor() {
    this.likes = []
  }

  // like 追加
  addLike(id, title, author, img) {
    const like = { id, title, author, img }
    this.likes.push( like )

    // local保存
    this.persistData()

    return like
  }

  // like 削除
  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id )
    this.likes.splice(index, 1)
    this.persistData()
  }

  // すでにlikeされているか判定
  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1
  }

  // likeの数
  getNumLikes() {
    return this.likes.length
  }

  // localに保存
  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes))
  }

  // localから読み込む
  readStorage() {
    const storage = JSON.parse( localStorage.getItem('likes') )
    if (storage) {
      this.likes = storage
    }
  }
}
