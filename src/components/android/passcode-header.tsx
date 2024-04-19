import {Icon, Img, Node, NodeProps, Rect, Txt} from "@motion-canvas/2d";
import {AndroidHeader} from "./android-header.js";
import {PossibleColor} from "@motion-canvas/core";

export class PasscodeHeader extends Node {
    constructor(props?: NodeProps) {
        super(props);

        this.add(<AndroidHeader color="white">
            <Rect gap={35} alignItems="start">
                <Icon icon="material-symbols:arrow-back-rounded" color="black" size={40}/>
            </Rect>
            <Icon icon="material-symbols:more-vert" color="black" size={40}/>
        </AndroidHeader>)
    }
}