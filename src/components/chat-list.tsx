import {blur, Img, Node, NodeProps, Rect, saturate, Txt, Video} from "@motion-canvas/2d";
import { PossibleColor } from "@motion-canvas/core";
import { Noise } from "./android/noise";
import {PRIMARY} from "../scenes/example.js";

interface ChatProps {
    name: string;
    message: string;
    author?: string;
    color: PossibleColor;
    locked?: boolean;
    hideBorder?: boolean;
    messages?: number;
    read?: boolean;
    avatar: string;
}

export class ChatList extends Node {
    constructor(props?: NodeProps & ChatProps) {
        super(props);
        this.add(<Rect alignItems="stretch" gap={5} marginTop={2} grow={1}>
            <Img margin={10} src={props.avatar} radius={50} width={90} />

            <Rect direction="column" grow={1} justifyContent="space-between">
                <Rect grow={1} alignItems="center">
                    <Rect direction="column" gap={8}>
                        <Rect direction="row" alignItems="start">
                            {props.locked ? <Img src="/lock.svg"/> : <></>}
                            <Txt fontFamily="Roboto" fill="black" fontSize={28} fontWeight={500} offsetX={-1}>
                                {props.name}
                            </Txt>
                        </Rect>

                        {props.locked ? (<Noise height={28} width={150}/>) :
                            (<Txt fontFamily="Roboto" fill="black" fontSize={25} fontWeight={400} offsetX={-1} opacity={0.6}>
                                {props.author ? <Txt fill={props.color}>{props.author}:</Txt> : <></>} {props.message}
                            </Txt>)}
                    </Rect>
                    <Rect grow={1} alignItems="end" alignSelf="center" padding={15} direction="column" gap={3}>
                        <Rect direction="row">
                            {props.read ? <Img height={25} marginRight={4} src="/read.svg"/> : <></>}
                            <Txt fontFamily="Roboto" fill="black" fontSize={22} fontWeight={400} offsetX={-1} opacity={0.6}>
                                9:04
                            </Txt>
                        </Rect>
                        <Rect fill={PRIMARY} filters={[saturate(0.5)]} padding={8} radius={100}
                              width={props.messages?.toString().length > 1 ? 40: 35}
                              justifyContent="center" opacity={props.messages ? 1 : 0}>
                            <Txt fontFamily="Roboto" fill="white" fontSize={22} fontWeight={400} offsetX={-1} marginBottom={-5}>
                                {props.messages ? props.messages.toString() : "0"}
                            </Txt>
                        </Rect>
                    </Rect>
                </Rect>
                <Rect height={1} fill={"black"} opacity={props.hideBorder ? 0 : 0.3} />
            </Rect>
        </Rect>);
    }
}