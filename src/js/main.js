import { AUDIO_ELEMENT, IMAGE_ELEMENT } from './dom-elements'
import { setAudioCtx, useFrequency } from './audio-freq-handler'
import { cssFilterValues } from './css-filter-values'
import './image-file-handler'

let freqInterval = null

function intervalFunction () {
  useFrequency((freqArray) => {
    IMAGE_ELEMENT.style.filter = `
      brightness(${cssFilterValues.getBrightness(freqArray)}%)
      blur(${cssFilterValues.getBlur(freqArray)}px)
    `
    IMAGE_ELEMENT.style.transform = `
      scale(${cssFilterValues.getScale(freqArray)})
    `
  })
}

AUDIO_ELEMENT.onplay = () => {
  setAudioCtx()
  freqInterval = setInterval(intervalFunction, 1)
}

AUDIO_ELEMENT.onpause = () => clearInterval(freqInterval)
AUDIO_ELEMENT.onended = () => clearInterval(freqInterval)
AUDIO_ELEMENT.onchange = () => clearInterval(freqInterval)
