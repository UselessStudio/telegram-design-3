import {Node, NodeProps, Rect} from "@motion-canvas/2d";
import {SCREEN_BORDER, SCREEN_WIDTH} from "../phone.js";
import {PossibleColor} from "@motion-canvas/core";

export class AndroidHeader extends Node {
    constructor(props?: NodeProps & {color: PossibleColor}) {
        super(props);

        this.add(<Rect width={SCREEN_WIDTH - SCREEN_BORDER * 2} height={160} fill={props.color}
                       paddingTop={70} paddingLeft={25} paddingRight={25}
                       alignItems="center" justifyContent="space-between">
            {this.children()}
        </Rect>);
    }
}