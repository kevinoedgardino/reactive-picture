function getFreqData ({ freqArray = [0], sliceParams = [0, 0] }) {
  const [from, to] = sliceParams

  const bassArray = freqArray.slice(from, to)
  const arrayLength = bassArray.length

  const bassAmplitude = bassArray.reduce((acc, cur) => acc + cur, 0)

  return { bassAmplitude, arrayLength }
}

function useMemoization (cacheStore = new Map(), bassAmplitude = 0, arrayLength = 0, calcFunction = function () {}) {
  const CACHE_KEY = `${bassAmplitude}_${arrayLength}`

  if (cacheStore.has(CACHE_KEY)) {
    return cacheStore.get(CACHE_KEY)
  }

  const calcValue = calcFunction(bassAmplitude, arrayLength)
  cacheStore.set(CACHE_KEY, calcValue)
  return calcValue
}

const cssFilterValues = {

  // Slider values
  brightness: 50,
  blur: 0,
  scale: 10,
  rotate: 5,
  hueRotate: 0,
  previousBassAverage: 0,

  // Memoization value store
  brightnessCache: new Map(),
  blurCache: new Map(),
  scaleCache: new Map(),
  rotateCache: new Map()

}

const setBrightness = (value) => {
  cssFilterValues.brightness = value
}

const calculateBrightness = (bassAmplitude, arrayLength) => {
  const bassAverage = bassAmplitude / arrayLength

  let maxValue = 400
  if (cssFilterValues.brightness < 100) {
    maxValue = 100 + (cssFilterValues.brightness / 100) * 300
  }

  let brightness = 100 + (bassAverage / 255) * (maxValue - 100)

  if (bassAverage < cssFilterValues.previousBassAverage) {
    brightness = 100 + (bassAverage / 255) * 50
  }

  cssFilterValues.previousBassAverage = bassAverage
  return cssFilterValues.brightness < 1 ? 100 : brightness
}

const getBrightness = (freqArray) => {
  const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 20] })
  const brightness = useMemoization(cssFilterValues.brightnessCache, bassAmplitude, arrayLength, calculateBrightness)
  return brightness
}

const setBlur = (value) => {
  cssFilterValues.blur = value
}

const calculateBlur = (bassAmplitude, arrayLength) => {
  const bassAverage = bassAmplitude / arrayLength

  const blur = bassAverage / 255 * cssFilterValues.blur

  return blur
}

const getBlur = (freqArray) => {
  const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 20] })
  const blur = useMemoization(cssFilterValues.blurCache, bassAmplitude, arrayLength, calculateBlur)
  return blur
}

const setScale = (value) => {
  cssFilterValues.scale = value
}

const calculateScale = (bassAmplitude, arrayLength) => {
  const bassAverage = bassAmplitude / arrayLength
  const normalizedFrequency = bassAverage / 255
  const maxScale = 2
  const minScale = 1

  const scaleFactor = (maxScale - minScale) * (cssFilterValues.scale / 20) * normalizedFrequency * (bassAmplitude > 2600 ? 2 : 1)

  let scale = minScale + scaleFactor

  if (scale < 1) {
    scale = 1
  }

  return scale
}

const getScale = (freqArray) => {
  const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 16] })
  const scale = useMemoization(cssFilterValues.scaleCache, bassAmplitude, arrayLength, calculateScale)
  return scale
}

const setRotate = (value) => {
  cssFilterValues.rotate = value
}

const calculateRotate = (bassAmplitude, arrayLength) => {
  const bassAverage = bassAmplitude / arrayLength
  const normalizedFrequency = bassAverage / 255
  const maxRotate = 180
  const minRotate = -180
  const scaleRotate = (cssFilterValues.rotate - 50) / 50
  let rotate = normalizedFrequency * scaleRotate * maxRotate
  rotate = Math.min(maxRotate, Math.max(minRotate, rotate))
  rotate = Math.floor(rotate)
  return rotate
}

const getRotate = (freqArray) => {
  const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 8] })
  const rotate = useMemoization(cssFilterValues.rotateCache, bassAmplitude, arrayLength, calculateRotate)
  return rotate
}

const getHueRotate = (freqArray) => {
  const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 12] })
  const bassAverage = bassAmplitude / arrayLength
  const hueRotate = bassAverage / 255 * 360
  return hueRotate
}

export {
  setBrightness,
  getBrightness,
  setBlur,
  getBlur,
  setScale,
  getScale,
  setRotate,
  getRotate,
  getHueRotate
}
