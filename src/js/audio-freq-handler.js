import { AUDIO_ELEMENT, AUDIO_FILE_ELEMENT } from './dom-elements'

const FREQUENCY_BIN_COUNT = 32
const dataArray = new Uint8Array(FREQUENCY_BIN_COUNT)

AUDIO_FILE_ELEMENT.onchange = () => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader()
  reader.onload = (e) => { AUDIO_ELEMENT.src = e.target.result }
  reader.readAsDataURL(AUDIO_FILE_ELEMENT.files[0])
}

let audioCtx = null
let analyser = null
let source = null

export function setAudioCtx () {
  audioCtx ||= new (window.AudioContext || window.webkitAudioContext)()
  analyser ||= audioCtx.createAnalyser()
  source ||= audioCtx.createMediaElementSource(AUDIO_ELEMENT)
  source.connect(analyser)
  analyser.connect(audioCtx.destination)
}

export function useFrequency (handlerFunction) {
  analyser.getByteFrequencyData(dataArray)
  handlerFunction(dataArray)
}
