import {Icon, Img, Node, NodeProps, Rect, Txt} from "@motion-canvas/2d";
import {AndroidHeader} from "./android-header.js";
import {PossibleColor} from "@motion-canvas/core";

export class MainHeader extends Node {
    constructor(props?: NodeProps & {color: PossibleColor}) {
        super(props);

        this.add(<AndroidHeader color={props.color}>
            <Rect gap={35} alignItems="start">
                <Icon icon="material-symbols:menu-rounded" color="white" size={40}/>
                <Txt fontFamily="Roboto" fill="white" fontSize={35} fontWeight={500} offsetX={-1}>
                    Telegram
                </Txt>
            </Rect>
            <Icon icon="material-symbols:search" color="white" size={40}/>
        </AndroidHeader>)
    }
}