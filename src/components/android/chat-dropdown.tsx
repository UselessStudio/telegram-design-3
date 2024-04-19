import {Icon, Img, Node, NodeProps, Rect, Txt} from "@motion-canvas/2d";
import {createRef, easeInOutCubic, Reference} from "@motion-canvas/core";

export class ChatDropdown extends Node {
    private readonly container: Reference<Rect>;
    private readonly image: Reference<Img>;
    constructor(props?: NodeProps) {
        super(props);
        this.container = createRef<Rect>();
        this.image = createRef<Img>();

        this.add(<Rect clip={true} ref={this.container}  offset={[1, 0]}>
            <Img ref={this.image} scale={1.5} src="/dropdown.svg" offset={[0, -1]} />
        </Rect>);
        this.container().width(this.image().naturalSize().width * 1.5);
        this.image().top(0);

    }

    public *open() {
        yield *this.container().height(this.image().naturalSize().height * 3, 0.4, easeInOutCubic);
    }

    public *close() {
        yield *this.container().height(0, 0.4, easeInOutCubic);
    }
}
