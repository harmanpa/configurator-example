import {Directive} from '@angular/core';
import {AbstractPass} from './abstract-pass';
import {Pass} from 'three/examples/jsm/postprocessing/Pass';
import {WebGLRenderer, WebGLRenderTarget} from 'three';
import {WebGLRendererComponent} from '../webgl-renderer.component';

@Directive({
    selector: '[appTransformerPass]'
})
export class TransformerPassDirective extends AbstractPass<TransformPass> {

    constructor() {
        super();
    }

    setup(renderer: WebGLRendererComponent): TransformPass {
        return new TransformPass();
    }

}

class TransformPass extends Pass {

    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void {
    }
}
