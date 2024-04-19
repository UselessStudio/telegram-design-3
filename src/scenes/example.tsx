import {Rect, makeScene2D, Gradient, Txt, Img, Node, Video} from '@motion-canvas/2d';
import {
  all,
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
import {ChatDropdown} from "../components/android/chat-dropdown.js";
import { PasscodeHeader } from '../components/android/passcode-header.js';
import {PasscodeInput} from "../components/android/passcode-input.js";

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
  view.add(<PhoneScreen x={0} y={800} ref={screen}>
    <MainHeader color={PRIMARY}/>
    <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
    <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
    <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
    <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
    <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
    <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
    <ChatList color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо"/>
  </PhoneScreen>);
  yield* waitFor(0.5);

  yield* tween(0.8, value => {
    title().position.y(map(0, -425, easeOutExpo(value)));
    screen().position.y(map(800, 150, easeOutExpo(value)));
  });
  const click = createRef<ClickMarker>();
  view.add(<ClickMarker zIndex={10} ref={click}/>);
  yield* click().click(0, 0);
  yield* all(
      click().endClick(),
      screen().transitionTo(<Rect direction="column" fill="white">
        <ChatHeader name="Воробей - и точка" members={67} color={PRIMARY}/>
      </Rect>)
  );

  const dropdown = createRef<ChatDropdown>();
  view.add(<ChatDropdown ref={dropdown} x={330} y={-230} />);

  yield* click().click(300, -200);

  yield* all(
      click().endClick(),
      dropdown().open(),
  );

  yield* click().click(200, 35);
  yield* all(
      click().endClick(),
      dropdown().close(),
  );

  const passcode = createRef<PasscodeInput>();
  yield* screen().transitionTo(<Rect direction="column" fill="white">
    <PasscodeHeader/>
    <Rect alignItems="center" direction="column">
      <Video play={true} src="/key.mp4" width={200} margin={20}/>
      <Txt fontFamily="Roboto" fontWeight={600} fontSize={28} margin={10}>Enter new passcode</Txt>
      <Rect fontFamily="Roboto" fontWeight={400} fontSize={25} opacity={0.5} direction="column" alignItems="center">
        <Txt>Please enter any 4 digits that you will use to unlock </Txt>
        <Txt>the chat with <Txt fontWeight={500}>Pavel Durov</Txt>.</Txt>
      </Rect>
      <PasscodeInput ref={passcode}/>
      {/*<Img src="/keypad.svg"/>*/}
    </Rect>
  </Rect>);
  yield* screen().setTheme(true);
  yield* passcode().unlock();

  yield* waitFor(3);

  yield* tween(0.8, value => {
    title().position.y(map(-425, 0, easeOutExpo(value)));
    screen().position.y(map(150, 800, easeOutExpo(value)));
  });
});
