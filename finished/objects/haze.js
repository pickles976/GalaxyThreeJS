import { BASE_LAYER, HAZE_MAX, HAZE_MIN, HAZE_OPACITY } from "../config/renderConfig.js"
import { clamp } from "../utils.js"
import * as THREE from 'three'


const hazeTexture = new THREE.TextureLoader().load('../resources/feathered60.png')
const hazeSprite = new THREE.SpriteMaterial({map: hazeTexture, color: 0x0082ff, opacity: HAZE_OPACITY, depthTest: false, depthWrite: false })

export class Haze {

    constructor(position) {
        this.position = position
        this.obj = null
    }

    updateScale(camera) {
        let dist = this.position.distanceTo(camera.position) / 250
        this.obj.material.opacity = clamp(HAZE_OPACITY * Math.pow(dist / 2.5, 2), 0, HAZE_OPACITY)
        this.obj.material.needsUpdate = true
    }

    toThreeObject(scene) {
        let sprite = new THREE.Sprite(hazeSprite)
        sprite.layers.set(BASE_LAYER)
        sprite.position.copy(this.position)

        // varying size of dust clouds
        sprite.scale.multiplyScalar(clamp(HAZE_MAX * Math.random(), HAZE_MIN, HAZE_MAX))

        this.obj = sprite
        scene.add(sprite)
    }

}