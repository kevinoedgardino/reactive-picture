const FREQUENCY_BIN_COUNT = 32
const FREQUENCY_ARRAY_POSITION = 10
const dataArray = new Uint8Array(FREQUENCY_BIN_COUNT)

const audioElement = document.getElementById('audio')
const audioFile = document.getElementById('file-audio')

audioFile.onchange = () => {
  const reader = new FileReader()
  reader.onload = (e) => { audioElement.src = e.target.result }
  reader.readAsDataURL(audioFile.files[0])
}

let freqInterval = null
let audioCtx = null
let analyser = null

function setAudioCtx () {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  analyser = audioCtx.createAnalyser()
  const source = audioCtx.createMediaElementSource(audioElement)
  source.connect(analyser)
  analyser.connect(audioCtx.destination)
}

let beats = 0
let green = 0
let yellow = 0
let red = 0

function useFrequency () {
  analyser.getByteFrequencyData(dataArray)
  const freqSelected = dataArray[FREQUENCY_ARRAY_POSITION]
  beats++

  if (freqSelected > 100 && freqSelected < 200) {
    document.querySelector('.box').style.background = 'yellow'
    yellow++
  } else if (freqSelected > 199 && freqSelected < 256) {
    document.querySelector('.box').style.background = 'red'
    red++
  } else {
    document.querySelector('.box').style.background = 'green'
    green++
  }

  document.querySelector('.box').style.height = `${freqSelected}px`
  document.querySelector('.box').style.width = `${freqSelected}px`

  document.getElementById('green').firstChild.nodeValue = `freq(g:${green})+: ${((100 * green) / beats).toFixed(2)}%`
  document.getElementById('yellow').firstChild.nodeValue = `freq(y:${yellow})+: ${((100 * yellow) / beats).toFixed(2)}%`
  document.getElementById('red').firstChild.nodeValue = `freq(r:${red})+: ${((100 * red) / beats).toFixed(2)}%`
}

audioElement.onplay = () => {
  setAudioCtx()
  freqInterval = setInterval(useFrequency, 1)
}

audioElement.onpause = () => clearInterval(freqInterval)
audioElement.onended = () => clearInterval(freqInterval)
