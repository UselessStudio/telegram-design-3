import {Circle, Node, NodeProps, Rect, saturate, Txt} from "@motion-canvas/2d";
import {
    all, chain,
    createRef,
    createRefMap,
    easeInElastic,
    easeInOutCubic,
    PlopSpring, Reference,
    ReferenceMap, SmoothSpring,
    spring, waitFor
} from "@motion-canvas/core";
import {StrikeSpring} from "@motion-canvas/core/lib/tweening/spring.js";
import {ClickMarker} from "../click.js";

const EMPTY = "#e0dfe0";
const FILLED = "#7dc067";

export class PasscodeInput extends Node {
    private keys: ReferenceMap<Rect>;
    private click: Reference<ClickMarker>;
    constructor(props?: NodeProps & {click: Reference<ClickMarker>}) {
        super(props);
        this.click = props.click
        this.keys = createRefMap<Rect>();
        this.add(<Rect direction="row" gap={15} margin={70}>
            <Rect ref={this.keys.a}
                  width={60} height={65}
                  stroke={FILLED} filters={[saturate(0)]} lineWidth={2}
                  radius={5} justifyContent="center" alignItems="center" clip={true}/>
            <Rect ref={this.keys.b}
                  width={60} height={65}
                  stroke={FILLED} filters={[saturate(0)]} lineWidth={2}
                  radius={5} justifyContent="center" alignItems="center" clip={true}></Rect>
            <Rect ref={this.keys.c}
                  width={60} height={65}
                  stroke={FILLED} filters={[saturate(0)]} lineWidth={2}
                  radius={5} justifyContent="center" alignItems="center" clip={true}></Rect>
            <Rect ref={this.keys.d}
                  width={60} height={65}
                  stroke={FILLED} filters={[saturate(0)]} lineWidth={2}
                  radius={5} justifyContent="center" alignItems="center" clip={true}></Rect>
        </Rect>);
    }

    public *clean() {
        const blocks = [this.keys.a, this.keys.b, this.keys.c, this.keys.d];
        for (const block of blocks) {
            block().filters.saturate(0);
            block().removeChildren();
        }
    }

    public *unlock() {
        const blocks = [
            {block: this.keys.a, coords: [-150, 230]},
            {block: this.keys.b, coords: [0, 230]},
            {block: this.keys.c, coords: [150, 230]},
            {block: this.keys.d, coords: [-150, 295]}
        ];

        for (const {block, coords} of blocks) {
            const dot = createRef<Circle>();
            block().add(<Circle ref={dot} fill="black" size={10}/>);
            yield chain(
                this.click().click(coords[0], coords[1]),
                this.click().endClick()
            );
            dot().margin.bottom(-75);
            yield* block().filters.saturate(1, 0.2, easeInOutCubic);
            yield spring(StrikeSpring, -65, 0, 0.1, value => {
                dot().margin.bottom(value);
            });
            yield all(
                waitFor(0.1),
                block().filters.saturate(0, 0.2, easeInOutCubic)
            );
            yield* waitFor(0.2);
        }

        for (const {block} of blocks) {
            yield chain(
                block().scale(1.05, 0.1, easeInOutCubic),
                block().filters.saturate(1, 0.2, easeInOutCubic),
                block().scale(1, 0.1, easeInOutCubic)
            );
            yield* waitFor(0.05);
        }
        yield* waitFor(0.1);
    }
}