import * as THREE from 'three';


export abstract class Transformer {
    prepare(scene: THREE.Scene): boolean {

        return true;
    }
}
