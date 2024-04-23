import {Circle, Rect, RectProps, Video} from "@motion-canvas/2d";
import {useRandom} from "@motion-canvas/core";

export class Noise extends Rect {
    constructor(props?: RectProps) {
        super(props);
        this.clip(true);
        this.add(<Video play={true} src="/noise.webm"/>);
        // const random = useRandom();
        // const count = 100;
        // for (let i = 0; i < count; i++) {
        //     this.add(<Circle marginTop={Math.round(this.width() * random.nextFloat())}
        //                      marginLeft={Math.round(this.height() * random.nextFloat())}
        //                      size={random.nextInt(2, 5)} fill="black" opacity={random.nextFloat(0.2, 1)}/>);
        // }

    }
}