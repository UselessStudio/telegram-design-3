import {Rect, makeScene2D, Gradient, Txt, Img, Node, Video} from '@motion-canvas/2d';
import {
  all, any,
  createRef, createRefMap, easeInOutCubic,
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

export const PRIMARY = "#1eb283";

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
  view.add(<Txt ref={title} fill="white" fontFamily="Roboto" fontWeight={700} fontSize={70}>Lock chats with passcodes</Txt>);
  const screen = createRef<PhoneScreen>();
  view.add(<PhoneScreen x={0} y={800} ref={screen}>
    <MainHeader color={PRIMARY}/>
    <ChatList avatar="/avatars/emil.jpg" color={PRIMARY} name="Emil Gusev" message="What's up, bro?" messages={1}/>
    <ChatList avatar="/avatars/durov.jpg" color={PRIMARY} name="Pavel Durov" message="I’d like both actually"/>
    <ChatList avatar="/avatars/daria.jpg" color={PRIMARY} name="Daria" message="Working on it!" read={true}/>
    <ChatList avatar="/avatars/avatar.jpg" color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо" messages={29}/>
    <ChatList avatar="/avatars/elon.jpg" color={PRIMARY} name="Elon" message="I prefer Twitter" read={true}/>
    <ChatList avatar="/avatars/sergey.jpg" color={PRIMARY} name="Sergey" message="See you soon!" read={true}/>
    <Rect height={800}/>
  </PhoneScreen>);
  yield* waitFor(0.5);

  yield* tween(0.8, value => {
    title().position.y(map(0, -425, easeOutExpo(value)));
    screen().position.y(map(800, 150, easeOutExpo(value)));
  });
  const click = createRef<ClickMarker>();
  view.add(<ClickMarker zIndex={10} ref={click}/>);
  yield* click().click(0, 15);
  yield* all(
      click().endClick(),
      screen().transitionTo(<Rect direction="column" fill="white">
        <ChatHeader name="Pavel Durov" members={67} color={PRIMARY} zIndex={2}/>
        <Img src="/dialog.svg" width={SCREEN_WIDTH - SCREEN_BORDER * 2} marginTop={-40}/>
      </Rect>)
  );

  const dropdown = createRef<ChatDropdown>();
  view.add(<ChatDropdown ref={dropdown} x={280} y={-220} />);

  yield* click().click(260, -200);

  yield* all(
      click().endClick(),
      dropdown().open(),
  );

  yield* click().click(200, 45);
  yield* click().endClick();
  yield* dropdown().close();

  const passcode = createRef<PasscodeInput>();
  const titles = createRefMap<Txt>();
  yield* any(
      title().position.y(-700, 0.5, easeInOutCubic),
      screen().position.y(0, 0.5, easeInOutCubic),
      screen().scale(0.8, 0.5, easeInOutCubic),
      waitFor(0.2)
  );
  yield* all(screen().transitionTo(<Rect direction="column" fill="white" height={SCREEN_HEIGHT-70}>
        <PasscodeHeader/>
        <Rect alignItems="center" direction="column" justifyContent="space-between" grow={1}>
          <Rect alignItems="center" direction="column">
            <Video play={true} src="/key.mp4" width={200} margin={20}/>
            <Txt fontFamily="Roboto" fontWeight={600} fontSize={28} margin={10} ref={titles.title}>Enter new passcode</Txt>
            <Rect fontFamily="Roboto" fontWeight={400} fontSize={25} opacity={0.5} direction="column" alignItems="center">
              <Txt ref={titles.a}>Please enter any 4 digits that you will use to </Txt>
              <Txt ref={titles.b}>unlock the chat with <Txt fontWeight={500}>Pavel Durov</Txt>.</Txt>
            </Rect>
            <PasscodeInput ref={passcode} click={click}/>
          </Rect>
          <Img src="/keypad.svg" width={SCREEN_WIDTH - SCREEN_BORDER * 2 - 30} marginBottom={20}/>
        </Rect>

      </Rect>),
      screen().setTheme(true),
  );

  yield* passcode().unlock();
  yield* waitFor(0.3);
  yield passcode().clean();
  titles.b().removeChildren();
  titles.b().add(<Txt>the chat history with <Txt fontWeight={500}>Pavel Durov</Txt>.</Txt>);
  yield* all(
      titles.title().text("Re-enter your passcode", 0.3, easeInOutCubic),
      titles.a().text("If you forget this passcode, you'll need to clear ", 0.3, easeInOutCubic),
  );
  yield* passcode().unlock();

  yield* all(
      screen().position.y(100, 0.4, easeInOutCubic),
      screen().scale(1, 0.4, easeInOutCubic),
  );

  yield* all(
      screen().transitionTo(<Rect direction="column" fill="white">
        <MainHeader color={PRIMARY}/>
        <ChatList avatar="/avatars/emil.jpg" color={PRIMARY} name="Emil Gusev" message="What's up, bro?" messages={1}/>
        <ChatList avatar="/avatars/avatar.jpg" color={PRIMARY} name="Pavel Durov" author="123" message="123" locked={true}/>
        <ChatList avatar="/avatars/daria.jpg" color={PRIMARY} name="Daria" message="Working on it!" read={true}/>
        <ChatList avatar="/avatars/avatar.jpg" color={PRIMARY} name="Воробей - и точка" author="Valera" message="Отуп ро озо" messages={29}/>
        <ChatList avatar="/avatars/elon.jpg" color={PRIMARY} name="Elon" message="I prefer Twitter" read={true}/>
        <ChatList avatar="/avatars/sergey.jpg" color={PRIMARY} name="Sergey" message="See you soon!" read={true}/>
        <Rect height={800}/>
      </Rect>),
      screen().setTheme(false),
  );
  const zoom = createRef<Rect>();
  view.add(<Rect ref={zoom} width={SCREEN_WIDTH-SCREEN_BORDER*2}
                 height={110} layout fill="white" radius={30} y={-104}
                 stroke={"rgba(0,0,0,0.22)"}>
    <ChatList avatar="/avatars/durov.jpg" color={PRIMARY} name="Pavel Durov" author="Valera" message="СВО" locked={true} hideBorder={true}/>
  </Rect>);
  yield* all(
      zoom().scale(1.4, 0.4, easeOutExpo),
      zoom().lineWidth(3, 0.4, easeOutExpo),
  );
  yield* waitFor(1);
  yield* all(
      zoom().scale(0.97, 0.4, easeOutExpo),
      zoom().lineWidth(0, 0.4, easeOutExpo),
  );
  zoom().remove();

  yield* tween(0.8, value => {
    title().position.y(map(-425, 0, easeOutExpo(value)));
    screen().position.y(map(150, 800, easeOutExpo(value)));
  });
});
