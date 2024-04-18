import {Rect, makeScene2D, Gradient, Txt, Img, Node} from '@motion-canvas/2d';
import {
  createRef, easeInOutCubic,
  easeOutExpo,
  map,
  tween,
  waitFor
} from '@motion-canvas/core';
import {PhoneScreen, SCREEN_BORDER, SCREEN_HEIGHT, SCREEN_WIDTH} from "../components/phone.js";
import {ClickMarker} from "../components/click.js";
import { ChatHeader } from '../components/android/chat-header.js';
import {MainHeader} from "../components/android/main-header.js";
import {ChatList} from "../components/chat-list.js";

const PRIMARY = "#1eb283";

export default makeScene2D(function* (view) {
  const gradient = new Gradient({
    type: "linear",
    fromX: -view.width()/2,
    fromY: -view.height()/2,
    toX: view.width(),
    toY: view.height(),
    stops: [
      {offset: 0, color: "#32c3d4"},
      {offset: 1, color: "#6dbe60"}
    ]
  });
  view.add(<Rect x={0} y={0} width={view.width()} height={view.height()} fill={gradient}/>);
  const title = createRef<Txt>();
  view.add(<Txt ref={title} fill="white" fontFamily="Roboto" fontWeight={700} fontSize={70}>Telegram Contest demo</Txt>);
  const screen = createRef<PhoneScreen>();
  const container = createRef<Node>();
  const prevScreen = createRef<Rect>();
  view.add(<PhoneScreen x={0} y={800} ref={screen}>
    <Rect ref={container} direction="row" fill="black">
      <Rect direction="column" ref={prevScreen} fill="white">
        <MainHeader color={PRIMARY}/>
        <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
        <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
        <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
        <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
        <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
        <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
        <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
      </Rect>

    </Rect>
  </PhoneScreen>);
  yield* waitFor(0.5);

  yield* tween(0.8, value => {
    title().position.y(map(0, -425, easeOutExpo(value)));
    screen().position.y(map(800, 150, easeOutExpo(value)));
  });
  const click = createRef<ClickMarker>();
  view.add(<ClickMarker ref={click}/>);
  yield* click().click(0, 0);

  const chat = createRef<Rect>();
  container().add(<Rect direction="column" ref={chat} fill="white">
    <ChatHeader name="Воробей - и точка" members={66} color={PRIMARY}/>
  </Rect>);
  yield chat().margin.left(-SCREEN_WIDTH + SCREEN_BORDER*2, 0.5, easeInOutCubic);
  yield* prevScreen().opacity(0.3, 0.5, easeInOutCubic);

  yield* waitFor(1);
});
