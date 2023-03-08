import * as THREE from 'three'
import { BLOOM_LAYER, STAR_MAX, STAR_MIN } from './config/renderConfig.js'
import { starTypes } from './config/starDistributions.js'

const texture = new THREE.TextureLoader().load('./resources/sprite120.png')
// const material = new THREE.SpriteMaterial({map: texture, color: "#ffffff"})
const materials = starTypes.color.map((color) => new THREE.SpriteMaterial({map: texture, color: color}))

export class Star {

    constructor(position) {
        this.position = position
        this.starType = this.generateStarType()
        this.obj = null
    }

    generateStarType() {
        let num = Math.random() * 100.0
        let pct = starTypes.percentage
        for (let i = 0; i < pct.length; i++) {
            num -= pct[i]
            if (num < 0) {
                return i
            }
        }
        return 0
    }

    updateScale(camera) {
        let dist = this.position.distanceTo(camera.position) / 250

        // update star size
        let starSize = dist * starTypes.size[this.starType]
        starSize = Math.min(Math.max(STAR_MIN, starSize), STAR_MAX)
        this.obj?.scale.copy(new THREE.Vector3(starSize, starSize, starSize))
    }

    toThreeObject(scene) {
        let star = new THREE.Sprite(materials[this.starType])
        star.layers.set(BLOOM_LAYER)
        
        star.scale.multiplyScalar(starTypes.size[this.starType])
        star.position.copy(this.position)

        this.obj = star

        scene.add(star)
    }
}