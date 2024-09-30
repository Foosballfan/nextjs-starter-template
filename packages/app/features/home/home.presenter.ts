import { makeAutoObservable } from 'mobx'
import CatStore from 'app/stores/Cat.store'
import { TToast } from 'app/stores/storeTypes'

export default class HomePresenter {
  constructor(
    private toast: TToast,
    private catStore: CatStore
  ) {
    makeAutoObservable(this)
  }

  get favouriteCat() {
    return this.catStore.favouriteCat
  }
  get unfavouriteCat() {
    return this.catStore.unfavouriteCat
  }
  get voteForCat() {
    return this.catStore.voteForCat
  }

  get cats() {
    return this.catStore.cats.map((cat) => {
      return {
        ...cat,
        favourite: this.catStore.favouriteCats.find((favourite) => favourite.image_id === cat.id),
        votes: this.catStore.votes.filter((vote) => vote.image_id === cat.id),
      }
    })
  }

  getCats = async () => {
    return await this.catStore.fetchCats()
  }
}
