import { Vector3 } from "three"
import { ARM_X_DIST, SPIRAL } from "./config/galaxyConfig.js"

export function gaussianRandom(mean=0, stdev=1) {
    let u = 1 - Math.random()
    let v = Math.random()
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

    return z * stdev + mean
}

export function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value))
}

export function spiral(x,y,z,offset) {
    let r = Math.sqrt(x**2 + y**2)
    let theta = offset
    theta += x > 0 ? Math.atan(y/x) : Math.atan(y/x) + Math.PI
    theta += (r/ARM_X_DIST) * SPIRAL
    return new Vector3(r*Math.cos(theta), r*Math.sin(theta), z)
}