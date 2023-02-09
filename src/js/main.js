import { AUDIO_ELEMENT } from './dom-elements'
import { setAudioCtx, useFrequency } from './audio-freq-handler'

let freqInterval = null

function intervalFunction () {
  useFrequency((freqArray) => {
    console.log(freqArray)
  })
}

AUDIO_ELEMENT.onplay = () => {
  setAudioCtx()
  freqInterval = setInterval(intervalFunction, 1)
}

AUDIO_ELEMENT.onpause = () => clearInterval(freqInterval)
AUDIO_ELEMENT.onended = () => clearInterval(freqInterval)
