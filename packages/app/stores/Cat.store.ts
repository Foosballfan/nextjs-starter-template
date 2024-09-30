import { makeAutoObservable } from 'mobx'
import { TToast } from './storeTypes'
import CatGateway from '../gateways/cat.gateway'

export interface ICat {
  url: string
  id: string
  width: number
  height: number
  favourite: boolean
}

export interface IVote {
  id: number
  image_id: string
  sub_id: string | null
  value: number
  country_code: string
  created_at: Date
  image: {
    url?: string
    id?: string
  }
}

export interface IFavourite {
  id: string
  user_id: string
  image_id: string
  sub_id: string
}

export default class CatStore {
  catGateway: CatGateway
  constructor(private toast: TToast) {
    this.catGateway = new CatGateway()
    makeAutoObservable(this)
  }

  cats: ICat[] = []
  favouriteCats: IFavourite[] = []
  votes: IVote[] = []

  fetchCats = async () => {
    const cats = await this.catGateway.getMyCats()
    this.cats = cats
    await this.fetchFavouriteCats()
    await this.fetchVotes()
  }

  voteForCat = async (imageId: string, value: number) => {
    const vote = await this.catGateway.upvoteImage(imageId, value)
    const direction = value > 0 ? 'up' : 'down'
    await this.toast.show(`Voted ${direction}!`)
    this.votes.push(vote)
  }
  fetchVotes = async () => {
    const votes = await this.catGateway.getVotes()
    this.votes = votes
  }

  fetchFavouriteCats = async () => {
    const favouriteCats = await this.catGateway.getFavourites()
    this.favouriteCats = favouriteCats
  }
  favouriteCat = async (imageId: string) => {
    const { id } = await this.catGateway.addFavourite(imageId)
    this.favouriteCats.push({ image_id: imageId, id } as IFavourite)
    await this.toast.show('Favourited!')
  }
  unfavouriteCat = async (imageId: string) => {
    const favouriteCat = this.favouriteCats.find((favourite) => favourite.image_id === imageId)
    if (favouriteCat) {
      await this.catGateway.unFavourite(favouriteCat.id)
      this.favouriteCats = this.favouriteCats.filter((cat) => cat.image_id !== imageId)
      return await this.toast.show(`Unfavourited :'(`)
    }
  }
}
