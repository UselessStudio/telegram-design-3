import {Circle, ComponentChildren, Img, Node, NodeProps, Rect} from "@motion-canvas/2d";
import {createRef, easeInOutCubic, Reference} from "@motion-canvas/core";

export const SCREEN_WIDTH = 720;
export const SCREEN_HEIGHT = 1280;
export const SCREEN_BORDER = 20;
const SCREEN_RADIUS = 60;



export class PhoneScreen extends Node {
    private readonly container: Reference<Rect>;
    private firstScreen: Reference<Rect>;
    private secondScreen: Reference<Rect>;
    private statusbar: Reference<Img>;
    constructor(props?: NodeProps) {
        super(props);
        this.container = createRef<Rect>();
        this.firstScreen = createRef<Rect>();
        this.statusbar = createRef<Img>();
        this.add(
            <Rect radius={SCREEN_RADIUS}
                  x={this.x} y={this.y}
                  width={SCREEN_WIDTH} height={SCREEN_HEIGHT}
                  stroke={"#00000096"}
                  lineWidth={SCREEN_BORDER} fill={"white"} clip={true}>
                <Rect layout ref={this.container} direction="row" fill="black" offset={[-1,-1]}
                      x={-SCREEN_WIDTH/2 + SCREEN_BORDER} y={-SCREEN_HEIGHT/2 + SCREEN_BORDER}>
                    <Rect direction="column" ref={this.firstScreen} fill="white">
                        {this.getChildren()}
                    </Rect>
                </Rect>
                <Img src="/statusbar.svg"
                     ref={this.statusbar}
                     width={SCREEN_WIDTH - SCREEN_BORDER*2}
                     y={-SCREEN_HEIGHT/2+SCREEN_BORDER+10}
                     offsetY={-1}/>
                <Rect radius={SCREEN_RADIUS - SCREEN_BORDER / 2} x={0} y={0}
                      width={SCREEN_WIDTH - SCREEN_BORDER}
                      height={SCREEN_HEIGHT - SCREEN_BORDER}
                      stroke="black" lineWidth={SCREEN_BORDER}>
                    <Circle x={0} y={-SCREEN_HEIGHT/2 + SCREEN_BORDER * 2.5} size={30} fill="black" />
                </Rect>
            </Rect>,
        );
    }

    public *setTheme(dark: boolean) {
        this.statusbar().src(dark ? "/dark-status.svg" : "/statusbar.svg");
        yield* this.statusbar().opacity(0).opacity(1, 0.2, easeInOutCubic);
    }

    public *transitionTo(node: ComponentChildren) {
        this.secondScreen = createRef<Rect>();
        this.container().add(<Rect direction="column" ref={this.secondScreen} fill="white">
            {node}
        </Rect>)
        yield this.secondScreen().margin.left(-SCREEN_WIDTH + SCREEN_BORDER*2, 0.5, easeInOutCubic);
        yield* this.firstScreen().opacity(0.3, 0.5, easeInOutCubic);
        this.firstScreen().remove();
        this.secondScreen().margin.left(0);
        this.firstScreen = this.secondScreen;
        this.secondScreen = null;
    }
}