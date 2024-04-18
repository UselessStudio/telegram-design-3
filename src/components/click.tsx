import {Circle, Node, NodeProps} from "@motion-canvas/2d";
import {all, chain, createRef, easeOutExpo, easeOutSine, map, Reference, tween} from "@motion-canvas/core";

export class ClickMarker extends Node {
    private readonly circle: Reference<Circle>;
    constructor(props?: NodeProps) {
        super(props);
        this.circle = createRef<Circle>();
        this.add(<Circle ref={this.circle} size={200} stroke="rgba(36, 175, 255, 0.4)" lineWidth={50} />);
    }

    public *click(x: number, y: number) {
        this.position.x(x);
        this.position.y(y);
        yield* tween(0.3, value => {
            this.circle().size(map(200, 250, easeOutSine(value)));
            this.circle().lineWidth(map(50, 70, easeOutSine(value)));
        });
        yield chain(
            tween(0.2, value => {
                this.circle().size(map(250, 100, easeOutExpo(value)));
                this.circle().lineWidth(map(70, 40, easeOutExpo(value)));
            }),
            tween(0.2, value => {
                this.circle().size(map(100, 300, easeOutExpo(value)));
                this.circle().lineWidth(map(40, 0, easeOutExpo(value)));
            })
        );
    }
}