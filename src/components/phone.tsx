import {Circle, Node, NodeProps, Rect} from "@motion-canvas/2d";

export const SCREEN_WIDTH = 720;
export const SCREEN_HEIGHT = 1280;
export const SCREEN_BORDER = 20;
const SCREEN_RADIUS = 60;



export class PhoneScreen extends Node {
    constructor(props?: NodeProps) {
        super(props);
        // ...
        this.add(
            <Rect radius={SCREEN_RADIUS}
                  x={this.x} y={this.y}
                  width={SCREEN_WIDTH} height={SCREEN_HEIGHT}
                  stroke={"#00000096"}
                  lineWidth={SCREEN_BORDER} fill={"white"} clip={true}>
                <Rect layout direction="column" offset={[-1,-1]} x={-SCREEN_WIDTH/2 + SCREEN_BORDER} y={-SCREEN_HEIGHT/2 + SCREEN_BORDER}>
                    {this.getChildren()}
                </Rect>
                <Rect radius={SCREEN_RADIUS - SCREEN_BORDER / 2} x={0} y={0}
                      width={SCREEN_WIDTH - SCREEN_BORDER}
                      height={SCREEN_HEIGHT - SCREEN_BORDER}
                      stroke="black" lineWidth={SCREEN_BORDER}>
                    <Circle x={0} y={-SCREEN_HEIGHT/2 + SCREEN_BORDER * 2.5} size={30} fill="black" />
                </Rect>
            </Rect>,
        );
    }


}