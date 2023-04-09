import { AUDIO_ELEMENT, HUE_CHECKBOX_ELEMENT, IMAGE_ELEMENT } from './dom-elements'
import { useFrequency } from './audio-freq-handler'
import { cssFilterValues } from './css-filter-values'
import './image-file-handler'
import { setSliderEvents, setSliderValues } from './sliders'

setSliderEvents()
setSliderValues()

let animationFrame = null
let hueRotateEnabled = false
HUE_CHECKBOX_ELEMENT.onclick = (e) => {
  hueRotateEnabled = e.target.checked
}

function applyImageSettings () {
  useFrequency((freqArray) => {
    const filterStyles = `
      brightness(${cssFilterValues.getBrightness(freqArray)}%)
      blur(${cssFilterValues.getBlur(freqArray)}px)
      hue-rotate(${hueRotateEnabled ? cssFilterValues.getHueRotate(freqArray) : 0}deg)
    `
    const transformStyles = `
      scale(${cssFilterValues.getScale(freqArray)})
      rotate(${cssFilterValues.getRotate(freqArray)}deg)
    `

    IMAGE_ELEMENT.style.filter = filterStyles
    IMAGE_ELEMENT.style.transform = transformStyles
  })
}

/**
 * @param { 'start' | 'stop' } action
 */
const authorEasterEgg = (action) => {
  if (action === 'start') {
    document.querySelector('.author-one').classList.add('author-one-active')
    document.querySelector('.author-one-active').classList.remove('author-one')
    document.querySelector('.author-two').classList.add('author-two-active')
    document.querySelector('.author-two-active').classList.remove('author-two')
  }
  else if (action === 'stop') {
    document.querySelector('.author-one-active').classList.add('author-one')
    document.querySelector('.author-one').classList.remove('author-one-active')
    document.querySelector('.author-two-active').classList.add('author-two')
    document.querySelector('.author-two').classList.remove('author-two-active')
  }
}

AUDIO_ELEMENT.onplay = () => {
  const isImgAudioSelected = Boolean(IMAGE_ELEMENT.src && AUDIO_ELEMENT.src)

  if (!isImgAudioSelected) {
    Swal.fire('Error', 'You must select an image and audio file to continue', 'error') // eslint-disable-line
    AUDIO_ELEMENT.pause()
  }
  else {
    authorEasterEgg('start')
    const refreshImage = () => {
      applyImageSettings()
      animationFrame = window.requestAnimationFrame(refreshImage)
    }

    refreshImage()
  }
}

AUDIO_ELEMENT.onpause = () => {
  window.cancelAnimationFrame(animationFrame)
  authorEasterEgg('stop')
}
AUDIO_ELEMENT.onended = () => {
  window.cancelAnimationFrame(animationFrame)
  authorEasterEgg('stop')
}
AUDIO_ELEMENT.onchange = () => {
  window.cancelAnimationFrame(animationFrame)
  authorEasterEgg('stop')
}
