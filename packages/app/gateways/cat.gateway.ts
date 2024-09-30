const API_URL = 'https://api.thecatapi.com/v1'
const API_KEY = 'live_51Q3VTSkEJ1Q29e20CHDfVYDhCazWmJHbAUBtUwfBp3UMj0LVj3HLKjC5VuZZVK7'
import { TheCatAPI } from '@thatapicompany/thecatapi'
const theCatAPI = new TheCatAPI(API_KEY)

export interface ICatImageUpload {
  uri: string
  name: string
  type: string
}

class CatGateway {
  private async fetchFromApi(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${API_URL}/${endpoint}`)
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))

    const response = await fetch(url.toString(), {
      headers: { 'x-api-key': API_KEY },
    })

    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`)
    }

    return response.json()
  }

  private async postToApi(endpoint: string, body: Record<string, string>) {
    const url = `${API_URL}/${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error(`Error posting to ${endpoint}: ${response.status} ${response.statusText}`)
    }
    return response.json()
  }

  private async deleteFromApi(endpoint: string) {
    const url = `${API_URL}/${endpoint}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY,
      },
    })
    if (!response.ok) {
      throw new Error(`Error deleting ${endpoint}: ${response.status} ${response.statusText}`)
    }
    return response.json()
  }

  private async postFormDataToApi(endpoint: string, body: FormData) {
    const url = `${API_URL}/${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'multipart/form-data',
      },
      body,
    })
    if (!response.ok) {
      throw new Error(`Error posting to ${endpoint}: ${response.status} ${response.statusText}`)
    }
    return response.json()
  }

  uploadImageNPMLibrary = async (file: File) => {
    const uploadedImage = await theCatAPI.images.uploadImage(file)
    return uploadedImage
  }

  async uploadCatImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    try {
      return await this.postFormDataToApi('images/upload', formData)
    } catch (error) {
      console.error('Error uploading cat image:', error)
      throw error
    }
  }

  async getBreeds() {
    try {
      return await this.fetchFromApi('breeds')
    } catch (error) {
      console.error('Error fetching breeds:', error)
      throw error
    }
  }

  async getFavourites() {
    try {
      return await this.fetchFromApi('favourites')
    } catch (error) {
      console.error('Error fetching favourites:', error)
      throw error
    }
  }
  async getVotes() {
    try {
      return await this.fetchFromApi('votes')
    } catch (error) {
      console.error('Error fetching votes:', error)
      throw error
    }
  }

  async addFavourite(imageId: string) {
    try {
      return await this.postToApi(`favourites`, { image_id: imageId })
    } catch (error) {
      console.error(`Error adding favourite for cat image (${imageId}):`, error)
      throw error
    }
  }
  async unFavourite(favouriteId: string) {
    try {
      return await this.deleteFromApi(`favourites/${favouriteId}`)
    } catch (error) {
      console.error(`Error removing favourite for cat image (${favouriteId}):`, error)
      throw error
    }
  }

  async getRandomCatImages() {
    try {
      const data = await this.fetchFromApi('images/search', { limit: '10' })
      return data
    } catch (error) {
      console.error('Error fetching random cat image:', error)
      throw error
    }
  }

  async getMyCats() {
    try {
      return await this.fetchFromApi('images', { limit: '10' })
    } catch (error) {
      console.error('Error fetching my cats:', error)
      throw error
    }
  }

  async getCatsByBreed(breedId: string) {
    try {
      return await this.fetchFromApi('images/search', { breed_id: breedId })
    } catch (error) {
      console.error(`Error fetching cats by breed (${breedId}):`, error)
      throw error
    }
  }

  async upvoteImage(imageId: string, value: number) {
    try {
      return await this.postToApi(`votes`, { image_id: imageId, value: value.toString() })
    } catch (error) {
      console.error(`Error voting for cat image (${imageId}):`, error)
      throw error
    }
  }
  async deleteVote(voteId: string) {
    try {
      return await this.deleteFromApi(`votes/${voteId}`)
    } catch (error) {
      console.error(`Error deleting vote ${voteId}:`, error)
      throw error
    }
  }

  async getCatImageById(imageId: string) {
    try {
      return await this.fetchFromApi(`images/${imageId}`)
    } catch (error) {
      console.error(`Error fetching cat image by id (${imageId}):`, error)
      throw error
    }
  }
}

export default CatGateway
