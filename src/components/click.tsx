import {Circle, Node, NodeProps, Txt} from "@motion-canvas/2d";
import {all, chain, createRef, easeInCubic, easeOutCubic, easeOutExpo, easeOutSine, map, Reference, tween} from "@motion-canvas/core";

export class ClickMarker extends Node {
    private readonly circle: Reference<Circle>;
    private readonly text: Reference<Txt>;

    constructor(props?: NodeProps) {
        super(props);
        this.circle = createRef<Circle>();
        this.text = createRef<Txt>();
        this.add(<Circle ref={this.circle} size={200} stroke="rgba(36, 175, 255, 0.4)" lineWidth={50} />);
    }

    public *click(x: number, y: number) {
        this.position.x(x);
        this.position.y(y);
        yield* tween(0.2, value => {
            this.circle().opacity(map(0, 1, easeInCubic(value)));
            this.circle().size(map(200, 250, easeOutSine(value)));
            this.circle().lineWidth(map(50, 70, easeOutSine(value)));
        });
        yield chain(
            tween(0.1, value => {
                this.circle().size(map(250, 100, easeOutExpo(value)));
                this.circle().lineWidth(map(70, 40, easeOutExpo(value)));
            }),
            tween(0.2, value => {
                this.circle().opacity(map(1, 0.5, easeOutCubic(value)));
                this.circle().size(map(100, 300, easeOutExpo(value)));
                this.circle().lineWidth(map(40, 0, easeOutExpo(value)));
            })
        );
    }
}