function getFreqData ({ freqArray = [0], sliceParams = [0, 0] }) {
  const [from, to] = sliceParams

  const bassArray = freqArray.slice(from, to)
  const arrayLength = bassArray.length

  let bassAmplitude = 0
  bassArray.forEach(function (value) {
    bassAmplitude += value
  })

  return { bassAmplitude, arrayLength }
}

export const cssFilterValues = {

  brightness: 50,
  blur: 0,
  scale: 10,
  rotate: 5,
  hueRotate: 0,
  previousBassAverage: 0,

  setBrightness (value) {
    this.brightness = value
  },

  getBrightness (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 20] })
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
    return this.brightness < 1 ? 100 : brightness
  },

  setBlur (value) {
    this.blur = value
  },

  getBlur (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 20] })

    const bassAverage = bassAmplitude / arrayLength

    const blur = bassAverage / 255 * this.blur

    return blur
  },

  setScale (value) {
    this.scale = value
  },

  getScale (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 16] })
    const bassAverage = bassAmplitude / arrayLength
    const normalizedFrequency = bassAverage / 255
    const maxScale = 2
    const minScale = 1
    const scaleFactor = (maxScale - minScale) * (this.scale / 20) * normalizedFrequency
    let scale = minScale + scaleFactor

    if (scale < 1) {
      scale = 1
    }

    return scale
  },

  setRotate (value) {
    this.rotate = value
  },

  getRotate (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 8] })
    const bassAverage = bassAmplitude / arrayLength
    const normalizedFrequency = bassAverage / 255
    const maxRotate = 180
    const minRotate = 0
    const scaleRotate = this.rotate / 100 // convert this.rotate to a scale from 0 to 1
    let rotate = normalizedFrequency * scaleRotate * maxRotate
    rotate = Math.min(maxRotate, Math.max(minRotate, rotate))
    rotate = Math.floor(rotate)
    return rotate
  },

  getHueRotate (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 12] })
    const bassAverage = bassAmplitude / arrayLength
    const hueRotate = bassAverage / 255 * 360
    return hueRotate
  }
}
