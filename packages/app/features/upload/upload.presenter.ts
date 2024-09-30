import { makeAutoObservable } from 'mobx'
import CatGateway, { ICatImageUpload } from 'app/gateways/cat.gateway'
import { TToast } from 'app/stores/storeTypes'

export default class UploadPresenter {
  private catGateway: CatGateway

  constructor(private toast: TToast) {
    makeAutoObservable(this)
    this.catGateway = new CatGateway()
  }

  fetchImageFromUri = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    return blob
  }

  uploadImage = async (file: ICatImageUpload) => {
    try {
      const imageBlob = await this.fetchImageFromUri(file.uri)
      const fileObject = new File([imageBlob], file.name)
      const response = await this.catGateway.uploadCatImage(fileObject)
      // uploadImageNPMLibrary(fileObject)
      this.toast.show('Image uploaded successfully')
      return response
    } catch (error) {
      this.toast.show('Error uploading image')
    }
  }
}
