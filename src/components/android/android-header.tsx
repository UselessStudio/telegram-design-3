import {Img, Node, NodeProps, Rect} from "@motion-canvas/2d";
import {SCREEN_BORDER, SCREEN_WIDTH} from "../phone.js";
import {PossibleColor} from "@motion-canvas/core";

export class AndroidHeader extends Node {
    constructor(props?: NodeProps & {color: PossibleColor}) {
        super(props);

        this.add(<Rect fill={props.color} direction="column" alignItems="center" justifyContent="end" paddingTop={70}>
            <Rect width={SCREEN_WIDTH - SCREEN_BORDER * 2} height={100} paddingLeft={25} paddingRight={25}
                       alignItems="center" justifyContent="space-between">
                {this.children()}
            </Rect>
        </Rect>);
    }
}