import {Icon, Img, Node, NodeProps, Rect, Txt} from "@motion-canvas/2d";
import { AndroidHeader } from "./android-header.js";
import {PossibleColor} from "@motion-canvas/core";

interface ChatProps {
    name: string;
    members: number;
    color: PossibleColor;
}

export class ChatHeader extends Node {
    constructor(props?: NodeProps & ChatProps) {
        super(props);

        this.add(<AndroidHeader color={props.color}>
            <Rect gap={20} alignItems="center">
                <Icon icon="material-symbols:arrow-back-rounded" color="white" size={40}/>
                <Img src="/avatars/durov.jpg" radius={50} width={70}/>
                <Rect direction="column">
                    <Txt fontFamily="Roboto" fill="white" fontSize={30} fontWeight={500} offsetX={-1}>
                        {props.name}
                    </Txt>
                    <Txt fontFamily="Roboto" fill="white" fontSize={20} fontWeight={400} offsetX={-1} opacity={0.8}>
                        last seen recently
                    </Txt>
                </Rect>
            </Rect>
            <Icon icon="material-symbols:more-vert" color="white" size={40}/>
        </AndroidHeader>);
    }
}