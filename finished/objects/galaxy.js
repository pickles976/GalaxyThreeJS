import * as THREE from 'three'
import { Star } from './star.js';
import { ARMS, ARM_X_DIST, ARM_X_MEAN, ARM_Y_DIST, ARM_Y_MEAN, CORE_X_DIST, CORE_Y_DIST, GALAXY_THICKNESS, HAZE_RATIO, NUM_STARS, OUTER_CORE_X_DIST, OUTER_CORE_Y_DIST } from '../config/galaxyConfig.js';
import { gaussianRandom, spiral } from '../utils.js';
import { Haze } from './haze.js';

export class Galaxy {

    constructor(scene) {

        this.scene = scene

        this.stars = this.generateObject(NUM_STARS, (pos) => new Star(pos))
        this.haze = this.generateObject(NUM_STARS * HAZE_RATIO, (pos) => new Haze(pos))

        this.stars.forEach((star) => star.toThreeObject(scene))
        this.haze.forEach((haze) => haze.toThreeObject(scene))
    }

    updateScale(camera) {
        this.stars.forEach((star) => {
            star.updateScale(camera)
        })
    
        this.haze.forEach((haze) => {
            haze.updateScale(camera)
        })
    }

    generateObject(numStars, generator) {
        let objects = []

        for ( let i = 0; i < numStars / 4; i++){
            let pos = new THREE.Vector3(gaussianRandom(0, CORE_X_DIST), gaussianRandom(0, CORE_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS))
            let obj = generator(pos)
            objects.push(obj)
        }

        for ( let i = 0; i < numStars / 4; i++){
            let pos = new THREE.Vector3(gaussianRandom(0, OUTER_CORE_X_DIST), gaussianRandom(0, OUTER_CORE_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS))
            let obj = generator(pos)
            objects.push(obj)
        }

        for (let j = 0; j < ARMS; j++) {
            for ( let i = 0; i < numStars / 4; i++){
                let pos = spiral(gaussianRandom(ARM_X_MEAN, ARM_X_DIST), gaussianRandom(ARM_Y_MEAN, ARM_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS), j * 2 * Math.PI / ARMS)
                let obj = generator(pos)
                objects.push(obj)
            }
        }

        return objects
    }
}