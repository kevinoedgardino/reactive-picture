function getFreqData ({ freqArray = [0], sliceParams = [0, 0] }) {
  const [from, to] = sliceParams

  const bassArray = freqArray.slice(from, to)
  const arrayLength = bassArray.length

  const bassAmplitude = bassArray.reduce((acc, cur) => acc + cur, 0)

  return { bassAmplitude, arrayLength }
}

export const cssFilterValues = {

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
  rotateCache: new Map(),

  useMemoization (cacheStore = new Map(), bassAmplitude = 0, arrayLength = 0, value = 0) {
    const CACHE_KEY = `${bassAmplitude}_${arrayLength}_${value}`

    if (cacheStore.has(CACHE_KEY)) {
      return cacheStore.get(CACHE_KEY)
    }

    return 'not_found'
  },

  setBrightness (value) {
    this.brightness = value
  },

  calculateBrightness (bassAmplitude, arrayLength) {
    const bassAverage = bassAmplitude / arrayLength

    let maxValue = 400
    if (this.brightness < 100) {
      maxValue = 100 + (this.brightness / 100) * 300
    }

    let brightness = 100 + (bassAverage / 255) * (maxValue - 100)

    if (bassAverage < this.previousBassAverage) {
      brightness = 100 + (bassAverage / 255) * 50
    }

    this.previousBassAverage = bassAverage
    const brightnessValue = this.brightness < 1 ? 100 : brightness

    // Saving the result
    const CACHE_KEY = `${bassAmplitude}_${arrayLength}_${this.brightness}`
    this.brightnessCache.set(CACHE_KEY, brightnessValue)

    return brightnessValue
  },

  getBrightness (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 20] })
    const brightness = this.useMemoization(this.brightnessCache, bassAmplitude, arrayLength, this.brightness)
    return brightness === 'not_found' ? this.calculateBrightness(bassAmplitude, arrayLength) : brightness
  },

  setBlur (value) {
    this.blur = value
  },

  calculateBlur (bassAmplitude, arrayLength) {
    const bassAverage = bassAmplitude / arrayLength

    const blur = bassAverage / 255 * this.blur

    // Saving the result
    const CACHE_KEY = `${bassAmplitude}_${arrayLength}_${this.blur}`
    this.blurCache.set(CACHE_KEY, blur)

    return blur
  },

  getBlur (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 20] })
    const blur = this.useMemoization(this.blurCache, bassAmplitude, arrayLength, this.blur)
    return blur === 'not_found' ? this.calculateBlur(bassAmplitude, arrayLength) : blur
  },

  setScale (value) {
    this.scale = value
  },

  calculateScale (bassAmplitude, arrayLength) {
    const bassAverage = bassAmplitude / arrayLength
    const normalizedFrequency = bassAverage / 255
    const maxScale = 2
    const minScale = 1

    const scaleFactor = (maxScale - minScale) * (this.scale / 20) * normalizedFrequency * (bassAmplitude > 2600 ? 2 : 1)

    let scale = minScale + scaleFactor

    if (scale < 1) {
      scale = 1
    }

    // Saving the result
    const CACHE_KEY = `${bassAmplitude}_${arrayLength}_${this.scale}`
    this.scaleCache.set(CACHE_KEY, scale)

    return scale
  },

  getScale (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 16] })
    const scale = this.useMemoization(this.scaleCache, bassAmplitude, arrayLength, this.scale)
    return scale === 'not_found' ? this.calculateScale(bassAmplitude, arrayLength) : scale
  },

  setRotate (value) {
    this.rotate = value
  },

  calculateRotate (bassAmplitude, arrayLength) {
    const bassAverage = bassAmplitude / arrayLength
    const normalizedFrequency = bassAverage / 255
    const maxRotate = 180
    const minRotate = -180
    const scaleRotate = (this.rotate - 50) / 50
    let rotate = normalizedFrequency * scaleRotate * maxRotate
    rotate = Math.min(maxRotate, Math.max(minRotate, rotate))
    rotate = Math.floor(rotate)

    // Saving the result
    const CACHE_KEY = `${bassAmplitude}_${arrayLength}_${this.rotate}`
    this.rotateCache.set(CACHE_KEY, rotate)

    return rotate
  },

  getRotate (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 8] })
    const rotate = this.useMemoization(this.rotateCache, bassAmplitude, arrayLength, this.rotate)
    return rotate === 'not_found' ? this.calculateRotate(bassAmplitude, arrayLength) : rotate
  },

  getHueRotate (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 12] })
    const bassAverage = bassAmplitude / arrayLength
    const hueRotate = bassAverage / 255 * 360
    return hueRotate
  }
}
