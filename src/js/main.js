import { AUDIO_ELEMENT, IMAGE_ELEMENT } from './dom-elements'
import { setAudioCtx, useFrequency } from './audio-freq-handler'
import { cssFilterValues } from './css-filter-values'
import './image-file-handler'

let animationFrame = null

function applyImageSettings () {
  useFrequency((freqArray) => {
    const filterStyles = `
      brightness(${cssFilterValues.getBrightness(freqArray)}%)
      blur(${cssFilterValues.getBlur(freqArray)}px)
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
  setAudioCtx()

  const refreshImage = () => {
    applyImageSettings()
    animationFrame = window.requestAnimationFrame(refreshImage)
  }

  refreshImage()
}

AUDIO_ELEMENT.onpause = () => window.cancelAnimationFrame(animationFrame)
AUDIO_ELEMENT.onended = () => window.cancelAnimationFrame(animationFrame)
AUDIO_ELEMENT.onchange = () => window.cancelAnimationFrame(animationFrame)
