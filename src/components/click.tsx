import {Circle, Node, NodeProps, Txt} from "@motion-canvas/2d";
import {
    all,
    chain,
    createRef,
    easeInCubic,
    easeInOutCubic, easeInOutQuad,
    easeOutCubic,
    easeOutExpo,
    easeOutSine,
    map,
    Reference,
    tween
} from "@motion-canvas/core";

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
        this.position.x(x).y(y);
        this.circle().opacity(0).size(200).lineWidth(50);
        yield* all(
            this.circle().opacity(1, 0.2, easeInOutCubic),
            this.circle().size(250, 0.2, easeInOutCubic),
            this.circle().lineWidth(50, 0.2, easeInOutCubic),
        );
    }
    public *endClick() {
        yield* all(
            this.circle().size(100, 0.1, easeInOutCubic),
            this.circle().lineWidth(40, 0.1, easeInOutCubic),
        );
        yield* all(
            this.circle().opacity(0.5, 0.2, easeInOutCubic),
            this.circle().size(300, 0.2, easeInOutCubic),
            this.circle().lineWidth(0, 0.2, easeInOutCubic),
        );
    }

    public *scroll(x: number, y: number) {
        this.position.x(x).y(y);
        this.circle().opacity(0).size(200).lineWidth(50);
        yield* all(
            this.circle().size(100, 0.1, easeInOutCubic),
            this.circle().lineWidth(40, 0.1, easeInOutCubic),
            this.circle().opacity(1, 0.1, easeInOutCubic),
        );
    }

    public *endScroll(x: number, y: number) {
        yield* all(
            this.position.x(x, 0.5, easeInOutQuad),
            this.position.y(y, 0.5, easeInOutQuad),
        );
        yield* all(
            this.circle().opacity(0.5, 0.2, easeInOutCubic),
            this.circle().lineWidth(0, 0.2, easeInOutCubic),
            this.circle().size(300, 0.2, easeInOutCubic),
        );
    }
}