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

  brightness: 250,
  blur: 0,
  scale: 2,
  rotate: 0,
  resBrightness: 0,

  getBrightness (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 20] })

    const bassAverage = bassAmplitude / arrayLength

    const brightness = bassAverage / 255 * this.brightness

    return brightness
  },

  getBlur (freq = 0) {
    return 0
  },

  getScale (freqArray) {
    const { bassAmplitude, arrayLength } = getFreqData({ freqArray, sliceParams: [0, 16] })

    const bassAverage = bassAmplitude / arrayLength

    const normalizedFrequency = bassAverage / 255

    let scale = 0
    const increment = normalizedFrequency * this.scale
    scale += increment

    return scale < 1 ? 1 : scale
  },

  getRotate (freq = 0) {
    return 0
  }
}
