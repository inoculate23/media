import * as THREE from 'three'
import { random } from 'lodash'
import ProjectedMaterial, { project } from './ProjectedMaterial'
import WebGLApp from './lib/WebGLApp.js'
import assets from './lib/AssetManager.js'

const canvas = document.querySelector('#app')

const webgl = new WebGLApp({
  canvas,
  background: '#222',
  orbitControls: {
    distance: 4,
    phi: Math.PI / 2.5,
    zoom: false,
  },
})

window.webgl = webgl


webgl.canvas.style.visibility = 'hidden'


const textureKey = assets.queue({
  url: 'images/IMG_2540.jpg',
  type: 'texture',
})


assets.load({ renderer: webgl.renderer }).then(() => {

  webgl.canvas.style.visibility = ''


  const elements = new THREE.Group()
  const NUM_ELEMENTS = 400
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    const geometry = new THREE.IcosahedronGeometry(random(0.1, 0.5))
    const material = new ProjectedMaterial({

      camera: webgl.camera,
      texture: assets.get(textureKey),
      color: 'black',
    })
    const element = new THREE.Mesh(geometry, material)

    if (i < NUM_ELEMENTS * 0.3) {
      element.position.x = random(-0.8, 0.2)
      element.position.y = random(-1.0, 0.5)
      element.position.z = random(-0.3, 0.3)
      element.scale.multiplyScalar(0.58)
    } else {
      element.position.x = random(-1.5, 1.5, true)
      element.position.y = random(-1, 2, true)
      element.position.z = random(-0.5, 0.5)
    }
    element.rotation.x = random(0, Math.PI * 2)
    element.rotation.y = random(0, Math.PI * 2)
    element.rotation.z = random(0, Math.PI * 2)

   
    project(element)

    elements.add(element)
  }

  webgl.scene.add(elements)

  elements.rotation.y = Math.PI / 2
  webgl.onUpdate(() => {
    elements.rotation.y -= 0.013
  })

  webgl.start()
  webgl.draw()
})
