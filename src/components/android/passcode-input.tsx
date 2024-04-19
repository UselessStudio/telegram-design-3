import {Circle, Node, NodeProps, Rect, Txt} from "@motion-canvas/2d";
import {
    all,
    createRef,
    createRefMap,
    easeInElastic,
    easeInOutCubic,
    PlopSpring,
    ReferenceMap, SmoothSpring,
    spring
} from "@motion-canvas/core";
import {StrikeSpring} from "@motion-canvas/core/lib/tweening/spring.js";

const EMPTY = "#e0dfe0";
const FILLED = "#7dc067";

export class PasscodeInput extends Node {
    private keys: ReferenceMap<Rect>;
    constructor(props?: NodeProps) {
        super(props);
        this.keys = createRefMap<Rect>();
        this.add(<Rect direction="row" gap={15} margin={70}>
            <Rect ref={this.keys.a}
                  width={60} height={65}
                  stroke={EMPTY} lineWidth={2}
                  radius={5} justifyContent="center" alignItems="center" clip={true}/>
            <Rect ref={this.keys.b}
                  width={60} height={65}
                  stroke={EMPTY} lineWidth={2}
                  radius={5} justifyContent="center" alignItems="center" clip={true}></Rect>
            <Rect ref={this.keys.c}
                  width={60} height={65}
                  stroke={EMPTY} lineWidth={2}
                  radius={5} justifyContent="center" alignItems="center" clip={true}></Rect>
            <Rect ref={this.keys.d}
                  width={60} height={65}
                  stroke={EMPTY} lineWidth={2}
                  radius={5} justifyContent="center" alignItems="center" clip={true}></Rect>
        </Rect>);
    }

    public *unlock() {
        for (const block of [this.keys.a, this.keys.b, this.keys.c, this.keys.d]) {
            const dot = createRef<Circle>();
            block().add(<Circle ref={dot} fill="black" size={10}/>);
            dot().margin.bottom(-65);
            yield* all(
                spring(StrikeSpring, -65, 0, 0.1, value => {
                    dot().margin.bottom(value);
                }),
                block().stroke(FILLED, 0.2, easeInOutCubic)
            );
        }
    }
}