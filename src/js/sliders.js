import { BRIGHTNESS_SLIDER_ELEMENT, BLUR_SLIDER_ELEMENT, SCALE_SLIDER_ELEMENT, ROTATION_SLIDER_ELEMENT } from './dom-elements'
import { cssFilterValues } from './css-filter-values'

function setSliderValues () {
  const brightness = BRIGHTNESS_SLIDER_ELEMENT.value
  const blur = BLUR_SLIDER_ELEMENT.value
  const scale = SCALE_SLIDER_ELEMENT.value
  const rotate = ROTATION_SLIDER_ELEMENT.value

  cssFilterValues.setBrightness(brightness)
  cssFilterValues.setBlur(blur)
  cssFilterValues.setScale(scale)
  cssFilterValues.setRotate(rotate)
}

function setSliderEvents () {
  BRIGHTNESS_SLIDER_ELEMENT.oninput = (e) => cssFilterValues.setBrightness(e.target.value)
  BLUR_SLIDER_ELEMENT.oninput = (e) => cssFilterValues.setBlur(e.target.value)
  SCALE_SLIDER_ELEMENT.oninput = (e) => cssFilterValues.setScale(e.target.value)
  ROTATION_SLIDER_ELEMENT.oninput = (e) => cssFilterValues.setRotate(e.target.value)
}

export { setSliderValues, setSliderEvents }
