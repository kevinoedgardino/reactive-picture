import { AUDIO_ELEMENT, IMAGE_ELEMENT } from './dom-elements'
import { setAudioCtx, useFrequency } from './audio-freq-handler'
import './image-file-handler'

let freqInterval = null

function intervalFunction () {
  useFrequency((freqArray) => {
    const freqSelected = freqArray[10]
    IMAGE_ELEMENT.style.filter = `brightness(${(freqSelected / 100) - 1.0}) blur(${(freqSelected / 100) - 1.10}px)`
    IMAGE_ELEMENT.style.transform = `scale(1.${parseInt(freqSelected / 100)}) rotate(${(freqSelected / 100) + 1}deg)`
  })
}

AUDIO_ELEMENT.onplay = () => {
  setAudioCtx()
  freqInterval = setInterval(intervalFunction, 1)
}

AUDIO_ELEMENT.onpause = () => clearInterval(freqInterval)
AUDIO_ELEMENT.onended = () => clearInterval(freqInterval)
