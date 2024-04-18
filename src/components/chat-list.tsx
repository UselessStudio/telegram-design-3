import {Img, Node, NodeProps, Rect, Txt} from "@motion-canvas/2d";
import {PossibleColor} from "@motion-canvas/core";

interface ChatProps {
    name: string;
    message: string;
    author: string;
    color: PossibleColor;
}

export class ChatList extends Node {
    constructor(props?: NodeProps & ChatProps) {
        super(props);
        this.add(<Rect alignItems="stretch" gap={5} marginTop={2}>
            <Img margin={10} src="/avatar.jpg" radius={50} width={90}/>
            <Rect direction="column" grow={1} justifyContent="space-between">
                <Rect grow={1} alignItems="center">
                    <Rect direction="column" gap={8}>
                        <Txt fontFamily="Roboto" fill="black" fontSize={28} fontWeight={500} offsetX={-1}>
                            {props.name}
                        </Txt>
                        <Txt fontFamily="Roboto" fill="black" fontSize={25} fontWeight={400} offsetX={-1} opacity={0.6}>
                            <Txt fill={props.color}>{props.author}:</Txt> {props.message}
                        </Txt>
                    </Rect>
                    <Rect grow={1} alignItems="end" alignSelf="center" padding={15} direction="column" gap={3}>
                        <Txt fontFamily="Roboto" fill="black" fontSize={22} fontWeight={400} offsetX={-1} opacity={0.6}>
                            9:04
                        </Txt>
                        <Rect fill="lightgrey" padding={8} radius={20}>
                            <Txt fontFamily="Roboto" fill="white" fontSize={22} fontWeight={400} offsetX={-1} marginBottom={-5}>
                                29
                            </Txt>
                        </Rect>
                    </Rect>
                </Rect>
                <Rect height={1} fill={"black"} opacity={0.3}/>
            </Rect>

        </Rect>);
    }
}