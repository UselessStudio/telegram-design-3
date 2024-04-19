import {Icon, Node, NodeProps, Rect, Txt} from "@motion-canvas/2d";
import {createRef, easeInOutCubic, Reference} from "@motion-canvas/core";

class DropdownOption extends Node {
    constructor(props?: NodeProps) {
        super(props);

        this.add(<Rect direction="row" alignItems="center">
            <Icon icon="material-symbols:volume-up-outline-rounded" size={40}/>
            <Txt fontSize={30} fill="white">Mute</Txt>
        </Rect>);
    }
}

export class ChatDropdown extends Node {
    private container: Reference<Rect>;
    constructor(props?: NodeProps) {
        super(props);
        this.container = createRef<Rect>();

        this.add(<Rect direction="column" fill="grey" ref={this.container}>
            <DropdownOption/>
            <DropdownOption/>
            <DropdownOption/>
        </Rect>);
    }

    public *open() {
        yield* this.container().height(0);
        yield* this.container().height(100, 0.1, easeInOutCubic);
    }
}
