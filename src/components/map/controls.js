import { Control, MousePosition } from 'ol/control'
import EventType from 'ol/events/EventType'
import { CLASS_CONTROL, CLASS_SELECTABLE, 
  // CLASS_UNSELECTABLE 
} from 'ol/css'
import { Draw } from 'ol/interaction'

import {
  getTransformFromProjections,
  getUserProjection,
  identityTransform,
} from 'ol/proj'
import { getUid, Overlay } from 'ol'
import { getArea, getLength } from 'ol/sphere'
import { LineString, Polygon } from 'ol/geom'
import { Sources } from '@/components/map/layers'
import { unByKey } from 'ol/Observable'
import short from 'short-uuid'
import { getCenter } from 'ol/extent'

export class LayerControl extends Control {
  constructor(opt_options) {
    const options = opt_options || {}
    super({
      element: document.createElement('div'),
    })
    this.setStyle = options.setStyle
    this.names = ['satellite', 'streets', 'terrain']
    this.zhNames = ['卫星', '矢量', '地形']
    // this.names = ["satellite", "streets", "terrain", "positron", "toner"];
    this.opened = false
    this.selectedStyle = '0'
    this.listOptions = null
    this.img = null
    this.adLink = document.getElementById('ad-linkad')
    this.imgURL ='https://cdn1.gosur.com/images/map-types/'
    this.initControl()
  }

  initControl() {
    this.container = this.element
    this.container.classList.add(
      CLASS_CONTROL,
      CLASS_SELECTABLE,
      'ol-layer-ctrl'
    )
    this.container.setAttribute('id', 'ol-layer-ctrl')
    this.container.style.order = '10'
    let t = document.createElement('div')
    t.classList.add('mini-map-img')
    t.addEventListener('click', (t) => {
      this.openOptions(t)
    })
    this.img = document.createElement('img')
    this.img.setAttribute('alt', this.names[this.selectedStyle])
    this.img.setAttribute('width', '91')
    this.img.setAttribute('height', '91')
    // console.log(this.selectedStyle);
    // "satellite" === this.selectedStyle
    //   ? this.img.setAttribute(
    //       "src",
    //       "https://cdn1.gosur.com/images/map-types/streets.png"
    //     )
    //   : this.img.setAttribute(
    //       "src",
    //       "https://cdn1.gosur.com/images/map-types/satellite.png"
    //     );
    this.img.setAttribute(
      'src',
      // `${this.imgURL}${this.names[this.selectedStyle]}.png`
      require("@/assets/images/map/"+this.names[this.selectedStyle]+".png")
    )
    this.listOptions = document.createElement('div')
    this.listOptions.setAttribute('id', 'list-type-map')
    this.listOptions.classList.add(
      'list-type-map'
      // CLASS_CONTROL,
      // CLASS_SELECTABLE
    )
    let e = document.createElement('div')
    e.classList.add('row', 'm-0')
    let n = document.createElement('div')
    n.classList.add('col-hide', 'text-center')
    let i = document.createElement('div')
    i.style.height = '51px'
    let s = document.createElement('div')
    s.classList.add('text-type'),
      s.addEventListener('click', () => {
        this.closeOptions()
      })
    let a = document.createElement('div')
    a.classList.add('label-type')
    let o = document.createElement('i')
    for (var r in (o.classList.add('fas', 'fa-chevron-right'),
    a.appendChild(o),
    a.appendChild(o),
    s.appendChild(a),
    n.appendChild(i), // n.appendChild(s),
    e.appendChild(n),
    this.names))
      if (null !== this.names[r]) {
        let t = document.createElement('div')
        t.classList.add('col', 'btn-type'),
          t.setAttribute('data-value', r),
          this.selectedStyle === r && t.classList.add('selected')
        let n = document.createElement('div')
        n.classList.add('type-map-image')
        let i = document.createElement('img')
        i.setAttribute(
          "src",
          "/map/" + this.names[r] + ".png"
          // "https://cdn1.gosur.com/images/map-types/" + this.names[r] + ".png"
        ),
        i.setAttribute('src', 
        // `${this.imgURL}${this.names[r]}.png`
          require("@/assets/images/map/"+this.names[r]+".png")
        ),
          i.setAttribute('alt', this.names[r]),
          i.setAttribute('width', '41'),
          i.setAttribute('height', '41')
        let s = document.createElement('div')
        s.classList.add('text-type')
        let a = document.createElement('div')
        a.classList.add('label-type'),
          (a.innerHTML = this.zhNames[r]),
          t.addEventListener('click', (t) => {
            this.changeType(t)
          }),
          n.appendChild(i),
          s.appendChild(a),
          t.appendChild(n),
          t.appendChild(s),
          e.appendChild(t)
      }
    t.appendChild(this.img),
      this.container.appendChild(t),
      this.listOptions.appendChild(e),
      this.container.appendChild(this.listOptions)
  }

  openOptions() {
    if (this.opened) {
      this.closeOptions()
      return
    }
    this.listOptions.classList.add('open'),
      null !== this.adLink && this.adLink.classList.add('d-none')
    this.opened = true
  }

  closeOptions() {
    this.listOptions.classList.remove('open'),
      null !== this.adLink && this.adLink.classList.remove('d-none')
    this.opened = false
  }

  changeType(t) {
    let e = t.target.closest('.btn-type')
    const n = e.getAttribute('data-value')
    this.setStyle(this.names[n])
    this.img.setAttribute('src', 
    // `${this.imgURL}${this.names[n]}.png`
      require("@/assets/images/map/"+this.names[n]+".png")
    )
    // "satellite" === n
    //   ? this.img.setAttribute(
    //       "src",
    //       "https://cdn1.gosur.com/images/map-types/streets.png"
    //     )
    //   : this.img.setAttribute(
    //       "src",
    //       "https://cdn1.gosur.com/images/map-types/satellite.png"
    //     ),
    document
      .getElementsByClassName('btn-type selected')[0]
      .classList.remove('selected'),
      e.classList.add('selected'),
      this.closeOptions()
  }
}

export class MeasureControl extends Control {
  constructor(opt_options) {
    const options = opt_options ?? {}
    super({
      element: document.createElement('div'),
      target: options.target,
    })
    this.source = options.source
    this.style = options.style
    this.overlay
    this.listener

    this.lengthInstance = this.measureInstance('LineString')
    this.areaInstance = this.measureInstance('Polygon')
    this.activated = null

    this.instance = {
      length: this.lengthInstance,
      area: this.areaInstance,
    }

    this.lengthButton = document.createElement('button')
    this.lengthButton.classList.add('ol-measure-length', 'ol-icon-small')
    this.lengthButton.setAttribute('type', 'button')
    this.lengthButton.addEventListener(
      EventType.CLICK,
      this.handle.bind(this, 'length'),
      false
    )

    this.areaButton = document.createElement('button')
    this.areaButton.classList.add('ol-measure-area', 'ol-icon-small')
    this.areaButton.setAttribute('type', 'button')
    this.areaButton.addEventListener(
      EventType.CLICK,
      this.handle.bind(this, 'area'),
      false
    )

    this.trashButton = document.createElement('button')
    this.trashButton.classList.add('ol-measure-trash', 'ol-icon-small')
    this.trashButton.setAttribute('type', 'button')
    this.trashButton.title = 'trash'
    //TODO
    this.trashButton.addEventListener(
      EventType.CLICK,
      this.handle.bind(this, 'trash'),
      false
    )
    this.buttons = {
      length: this.lengthButton,
      area: this.areaButton,
      trash: this.trashButton,
    }
    const root = this.element
    root.classList.add('ol-measure', CLASS_SELECTABLE, CLASS_CONTROL)
    root.appendChild(this.lengthButton)
    root.appendChild(this.areaButton)
    root.appendChild(this.trashButton)
  }

  measureInstance(mode) {
    const global = this
    const draw = new Draw({
      type: mode,
      source: this.source,
      style: this.style,
    })
    draw.on('drawstart', (e) => {
      global.overlay = this.createTooltipOverlay()
      const sketch = e.feature
      let tooltipCoordinate = e.coordinate
      global.addOverlay()
      global.listener = sketch.getGeometry().on('change', function (evt) {
        const geom = evt.target
        if (geom instanceof Polygon) {
          global.overlay.getElement().innerHTML = global.formatArea(geom)
          // tooltipCoordinate = geom.getInteriorPoint().getCoordinates();
          // global.overlay.setPosition(tooltipCoordinate);
        } else if (geom instanceof LineString) {
          global.overlay.getElement().innerHTML = global.formatLength(geom)
          // tooltipCoordinate = geom.getLastCoordinate();
          // global.overlay.setPosition(tooltipCoordinate);
        }
        tooltipCoordinate = getCenter(geom.getExtent())
        global.overlay.setPosition(tooltipCoordinate)
      })
    })
    draw.on('drawend', (e) => {
      global.overlay.getElement().className = 'ol-tooltip ol-tooltip-static'
      let closeBtn = document.createElement('span')
      closeBtn.innerHTML = '×'
      closeBtn.className = 'ol-tooltip-close'
      const fid = getUid(e.feature)
      const oid = getUid(global.overlay)
      closeBtn.addEventListener('click', () => {
        global.close(fid, oid)
      })
      global.overlay.getElement().appendChild(closeBtn)
      unByKey(global.listener)
    })

    return draw
  }

  close(fid, oid) {
    const map = this.getMap()
    const o = map
      .getOverlays()
      .getArray()
      .find((i) => getUid(i) === oid)
    map.removeOverlay(o)
    const f = Sources.Measure.getFeatureByUid(fid)
    Sources.Measure.removeFeature(f)
  }

  trash() {
    const map = this.getMap()
    this.source.clear()
    const overlays = map.getOverlays()
    const tooltips = overlays
      .getArray()
      .filter((i) => i.getId().startsWith('measure'))
    tooltips.forEach((e) => {
      overlays.remove(e)
    })
  }

  addOverlay() {
    const map = this.getMap()
    map.addOverlay(this.overlay)
  }

  createTooltipOverlay = () => {
    const target = document.createElement('div')
    target.className = 'ol-tooltip'
    target.innerHTML = '起点'
    return new Overlay({
      id: 'measure-' + short.generate(),
      element: target,
      // offset: [0, -15],
      positioning: 'center-center',
      stopEvent: true,
    })
  }

  formatLength = function (line) {
    const length = getLength(line)
    let output
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm'
    }
    return output
  }

  formatArea = function (polygon) {
    const area = getArea(polygon)
    let output
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>'
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>'
    }
    return output
  }

  switch(mode) {
    const other = 'length' !== mode ? 'length' : 'area'
    this.buttons[mode].classList.add('ol-selected')
    this.buttons[other].classList.remove('ol-selected')
  }

  handle(mode, event) {
    console.log(event)
    const map = this.getMap()
    if (mode === 'trash') {
      this.trash()
      return
    }
    if (this.activated) {
      map.removeInteraction(this.instance[this.activated])
    }
    if (this.activated === mode) {
      this.buttons[mode].classList.remove('ol-selected')
      return
    }
    this.switch(mode)
    map.addInteraction(this.instance[mode])
    this.activated = mode
  }
}

export class WeatherLayerControl extends Control {
  constructor(opt_options) {
    const options = opt_options ?? {}
    super({
      element: document.createElement('div'),
      target: options.target,
    })
    this.setVisible = options.setVisible
    this.actived = []
    this.windButton = document.createElement('button')
    this.windButton.classList.add('ol-weather-wind', 'ol-icon')
    this.windButton.setAttribute('type', 'button')
    this.windButton.title = 'length'
    //TODO
    // this.windButton.appendChild(document.createTextNode("W"));
    this.windButton.addEventListener(
      EventType.CLICK,
      this.handle.bind(this, 'wind'),
      false
    )

    this.rainButton = document.createElement('button')
    this.rainButton.classList.add('ol-weather-rain', 'ol-icon')
    this.rainButton.setAttribute('type', 'button')
    this.rainButton.title = 'length'
    this.rainButton.addEventListener(
      EventType.CLICK,
      this.handle.bind(this, 'rain'),
      false
    )

    this.cloudButton = document.createElement('button')
    this.cloudButton.classList.add('ol-weather-cloud', 'ol-icon')
    this.cloudButton.setAttribute('type', 'button')
    this.cloudButton.title = 'trash'
    //TODO
    this.cloudButton.addEventListener(
      EventType.CLICK,
      this.handle.bind(this, 'cloud'),
      false
    )
    this.picker = {
      wind: this.windButton,
      rain: this.rainButton,
      cloud: this.cloudButton,
    }
    const root = this.element
    root.classList.add('ol-weather', CLASS_SELECTABLE, CLASS_CONTROL)
    root.appendChild(this.windButton)
    root.appendChild(this.rainButton)
    root.appendChild(this.cloudButton)
  }

  handle(mode, event) {
    console.log(event)
    const element = this.picker[mode]
    if (this.actived.includes(mode)) {
      element.classList.remove('ol-selected')
      this.actived = this.actived.filter((i) => i !== mode)
      this.setVisible(mode, false)
      element.blur()
    } else {
      element.classList.add('ol-selected')
      this.actived.push(mode)
      this.setVisible(mode, true)
    }
  }
}

export class CoordinateInfoControl extends MousePosition {
  constructor(opt_options) {
    const options = opt_options ?? {}
    super({
      projection: options.projection,
      undefinedHTML: `<div style="padding-top: 1.6px">0.00</div><div style="padding-bottom: 1.6px">0.00</div>`,
    })
    this.element.className = ''
    this.element.classList.add(
      CLASS_CONTROL,
      CLASS_SELECTABLE,
      'ol-coordinate-ctrl'
    )
    this.currentProject = 'EPSG:4326'
    const global = this
    this.element.addEventListener('pointerdown', (event) => {
      if (global.currentProject === 'EPSG:4326') {
        global.currentProject = 'EPSG:3857'
      } else {
        global.currentProject = 'EPSG:4326'
      }
      global.setProjection(this.currentProject)
      const map = this.getMap()
      this.updateHTML_(map.getEventPixel(event))
    })
  }

  updateHTML_(pixel) {
    let html = this.placeholder_
    if (pixel && this.mapProjection_) {
      if (!this.transform_) {
        const projection = this.getProjection()
        if (projection) {
          this.transform_ = getTransformFromProjections(
            this.mapProjection_,
            projection
          )
        } else {
          this.transform_ = identityTransform
        }
      }
      const map = this.getMap()
      const coordinate = map.getCoordinateFromPixelInternal(pixel)
      if (coordinate) {
        const userProjection = getUserProjection()
        if (userProjection) {
          this.transform_ = getTransformFromProjections(
            this.mapProjection_,
            userProjection
          )
        }
        this.transform_(coordinate, coordinate)
        const coordinateFormat = this.getCoordinateFormat()
        if (coordinateFormat) {
          html = coordinateFormat(coordinate)
        } else {
          const [lon, lat] = coordinate
          html = `<div style="padding-top: 1.6px">${lon.toFixed(
            6
          )}</div><div style="padding-bottom: 1.6px">${lat.toFixed(6)}</div>`
        }
      }
    }
    if (!this.renderedHTML_ || html !== this.renderedHTML_) {
      this.element.innerHTML = html
      this.renderedHTML_ = html
    }
  }
}

export class ColorBarControl extends Control {
  constructor(opt_options) {
    console.log(opt_options)
    // const option = opt_options ?? {}
    super({
      element: document.createElement('div'),
    })
    this.display = 'block'
    this.addChangeListener('display', this.refresh)
    this.element.style.display = this.display
    this.element.classList.add(
      CLASS_CONTROL,
      CLASS_SELECTABLE,
      'ol-color-bar',
      'ol-control-top'
    )

    const maxValue = document.createElement('span')
    maxValue.innerText = '<100'
    maxValue.style.color = 'white'
    maxValue.style.marginLeft = '-3px'
    maxValue.style.bottom = '3px'
    this.element.appendChild(maxValue)
    const colorMap = document.createElement('div')
    colorMap.classList.add('ol-color-bar-content', 'ol-control-top')
    colorMap.addEventListener('pointermove', (e) => {
      let bbox_rect = colorMap.getBoundingClientRect()
      // let layerX = e.clientX - bbox_rect.left;
      let layerY = e.clientY - bbox_rect.top
      // console.log((layerY / 148) * 100);
      let percent = Math.round((layerY / 148) * 500 + 100)
      if (percent >= 600) percent = 600
      tooltip.style.top = `${layerY}px`
      tooltip.innerText = percent.toString()
    })
    colorMap.addEventListener('pointerenter', () => {
      tooltip.style.display = 'block'
    })
    colorMap.addEventListener('pointerout', () => {
      tooltip.style.display = 'none'
    })
    this.element.appendChild(colorMap)
    const minValue = document.createElement('span')
    minValue.innerText = '>600'
    minValue.style.color = 'white'
    minValue.style.marginLeft = '-3px'
    minValue.style.top = '3px'
    this.element.appendChild(minValue)
    const tooltip = document.createElement('div')
    tooltip.innerText = 'hello'
    tooltip.style.color = 'white'
    tooltip.style.display = 'none'
    tooltip.style.marginLeft = '-30px'
    tooltip.style.position = 'absolute'
    this.element.appendChild(tooltip)
  }

  setDisplay(val) {
    if (val) {
      this.set('display', 'block')
    } else {
      this.set('display', 'none')
    }
    this.element.style.display = this.get('display')
  }

  refresh() {
    this.element.style.display = this.display
  }
}
