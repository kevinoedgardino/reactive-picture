import { AUDIO_ELEMENT, HUE_CHECKBOX_ELEMENT, IMAGE_ELEMENT } from './dom-elements'
import { setAudioCtx, useFrequency } from './audio-freq-handler'
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

AUDIO_ELEMENT.onplay = () => {
  const isImgAudioSelected = Boolean(IMAGE_ELEMENT.src)

  /* eslint brace-style: ["error", stroustrup] */
  if (!isImgAudioSelected) {
    Swal.fire('Error', 'You must select an image and audio file to continue', 'error') // eslint-disable-line
    AUDIO_ELEMENT.pause()
  }
  else {
    setAudioCtx()

    const refreshImage = () => {
      applyImageSettings()
      animationFrame = window.requestAnimationFrame(refreshImage)
    }

    refreshImage()
  }
}

AUDIO_ELEMENT.onpause = () => window.cancelAnimationFrame(animationFrame)
AUDIO_ELEMENT.onended = () => window.cancelAnimationFrame(animationFrame)
AUDIO_ELEMENT.onchange = () => window.cancelAnimationFrame(animationFrame)
