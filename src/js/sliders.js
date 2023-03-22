import {
  BRIGHTNESS_SLIDER_ELEMENT,
  BLUR_SLIDER_ELEMENT,
  SCALE_SLIDER_ELEMENT,
  ROTATION_SLIDER_ELEMENT,
  BRIGHTNESS_LABEL_ELEMENT,
  BLUR_LABEL_ELEMENT,
  SCALE_LABEL_ELEMENT,
  ROTATION_LABEL_ELEMENT
} from './dom-elements'
import { cssFilterValues } from './css-filter-values'

const assignLabelTextValue = (elm, value) => {
  elm.firstChild.nodeValue = value
}

function setSliderValues () {
  const brightness = BRIGHTNESS_SLIDER_ELEMENT.value
  const blur = BLUR_SLIDER_ELEMENT.value
  const scale = SCALE_SLIDER_ELEMENT.value
  const rotate = ROTATION_SLIDER_ELEMENT.value
  const modifiedRotateValue = -(rotate - (rotate - (50 - rotate)))

  cssFilterValues.setBrightness(brightness)
  cssFilterValues.setBlur(blur)
  cssFilterValues.setScale(scale)
  cssFilterValues.setRotate(rotate)

  assignLabelTextValue(BRIGHTNESS_LABEL_ELEMENT, brightness)
  assignLabelTextValue(BLUR_LABEL_ELEMENT, blur)
  assignLabelTextValue(SCALE_LABEL_ELEMENT, scale)
  assignLabelTextValue(ROTATION_LABEL_ELEMENT, modifiedRotateValue)
}

function setSliderEvents () {
  BRIGHTNESS_SLIDER_ELEMENT.oninput = (e) => {
    const { value: brightnessSliderValue } = e.target

    cssFilterValues.setBrightness(brightnessSliderValue)
    assignLabelTextValue(BRIGHTNESS_LABEL_ELEMENT, brightnessSliderValue)
  }

  BLUR_SLIDER_ELEMENT.oninput = (e) => {
    const { value: blurSliderValue } = e.target

    cssFilterValues.setBlur(blurSliderValue)
    assignLabelTextValue(BLUR_LABEL_ELEMENT, blurSliderValue)
  }

  SCALE_SLIDER_ELEMENT.oninput = (e) => {
    const { value: scaleSliderValue } = e.target

    cssFilterValues.setScale(scaleSliderValue)
    assignLabelTextValue(SCALE_LABEL_ELEMENT, scaleSliderValue)
  }

  ROTATION_SLIDER_ELEMENT.oninput = (e) => {
    const { value: rotateSliderValue } = e.target
    const rotation = -(rotateSliderValue - (rotateSliderValue - (50 - rotateSliderValue)))
    console.log(rotation, rotateSliderValue)
    cssFilterValues.setRotate(rotateSliderValue)
    assignLabelTextValue(ROTATION_LABEL_ELEMENT, rotation)
  }
}

export { setSliderValues, setSliderEvents }
