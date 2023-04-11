import { IMAGE_ELEMENT, IMAGE_FILE_ELEMENT } from './dom-elements'

IMAGE_FILE_ELEMENT.onchange = (e) => {
  IMAGE_ELEMENT.src = URL.createObjectURL(e.target.files?.item(0))
  document.querySelector('.picture-show').classList.remove('picture-show-cover')
}
