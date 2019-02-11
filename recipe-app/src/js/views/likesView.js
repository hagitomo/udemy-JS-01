import { elements } from './base.js'

export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'

  document.querySelector('.header__likes use').setAttribute('href', `img/icons.svg#${iconString}`)
}

// like メニューボタン 表示切り替え
export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visibility = numLikes > 0 ? 'visible': 'hidden'
}


// likeをrendering
export const renderLike = like => {
  const markup =
  `
  <li>
    <a class="likes__link" href="#${ like.id }">
        <figure class="likes__fig">
            <img src="${ like.img }" alt="${ like.title }">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${ like.title }</h4>
            <p class="likes__author">${ like.author }</p>
        </div>
    </a>
  </li>
  `

  elements.likesList.insertAdjacentHTML('beforeend', markup)
}


// like削除
export const deleteLike = id => {
  const like = document.querySelector(`.likes__link[href="#${id}"]`).parentElement
  if (like) like.parentElement.removeChild(like)
}
