import { IMAGE_ELEMENT, IMAGE_FILE_ELEMENT } from './dom-elements'

IMAGE_FILE_ELEMENT.onchange = () => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader()
  reader.onload = (e) => { IMAGE_ELEMENT.src = e.target.result }
  reader.readAsDataURL(IMAGE_FILE_ELEMENT.files[0])
}
