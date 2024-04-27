import {Rect, makeScene2D, Gradient, Txt, Img, Node, Video, blur, Circle} from '@motion-canvas/2d';
import {
  all, any, chain,
  createRef, createRefMap, createSignal, easeInOutCubic,
  easeOutExpo, linear,
  map,
  tween, useRandom,
  waitFor
} from '@motion-canvas/core';
import {PhoneScreen, SCREEN_BORDER, SCREEN_HEIGHT, SCREEN_RADIUS, SCREEN_WIDTH} from "../components/phone.js";
import {ClickMarker} from "../components/click.js";
import { ChatHeader } from '../components/android/chat-header.js';
import {MainHeader} from "../components/android/main-header.js";
import {ChatList} from "../components/chat-list.js";

export const PRIMARY = "#a26062";

export default makeScene2D(function* (view) {
  const gradient = new Gradient({
    type: "linear",
    fromX: -view.width()/2,
    fromY: -view.height()/2,
    toX: view.width(),
    toY: view.height(),
    stops: [
      {offset: 0, color: "#ff7575"},
      {offset: 1, color: "#960606"}
    ]
  });
  view.add(<Rect x={0} y={0} width={view.width()} height={view.height()} fill={gradient}/>);
  const title = createRef<Txt>();
  view.add(<Txt ref={title} fill="white" fontFamily="Roboto" fontWeight={700} fontSize={70}>Video Messages Sequence</Txt>);
  const screen = createRef<PhoneScreen>();
  view.add(<PhoneScreen x={0} y={800} ref={screen}>
    <MainHeader color={PRIMARY}/>
    <ChatList avatar="/avatars/emil.jpg" color={PRIMARY} name="Emil Gusev" message="What's up, bro?" messages={1}/>
    <ChatList avatar="/avatars/durov.jpg" color={PRIMARY} name="Pavel Durov" message="I’d be right happy to!" read={true}/>
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
  const chat = createRef<Rect>();
  const messages = createRef<Rect>();
  yield* all(
      click().endClick(),
      screen().transitionTo(<Rect direction="column" fill="white">
        <ChatHeader name="Pavel Durov" members={67} color={PRIMARY} zIndex={2}/>
        <Img src="/dialog.svg" width={SCREEN_WIDTH - SCREEN_BORDER * 2} marginTop={-40}/>
        <Rect layout={false} ref={chat}>
          <Img ref={messages} src="/messages.svg" width={SCREEN_WIDTH - SCREEN_BORDER * 2} offsetY={1} y={520}/>
        </Rect>
        <Img src="/message-bar.svg" width={SCREEN_WIDTH - SCREEN_BORDER*2} marginTop={-91}/>
      </Rect>)
  );
  yield* all(
      title().position.y(-700, 0.5, easeInOutCubic),
      screen().position.y(0, 0.5, easeInOutCubic),
      screen().scale(0.8, 0.5, easeInOutCubic),
      waitFor(0.2)
  );


  yield* click().scroll(205, 435);
  const container = createRef<Rect>();
  const counter = createRef<Rect>();
  const video = createRef<Video>();
  const button = createRef<Img>();
  const lock = createRef<Img>();
  const circle = createRef<Circle>();
  const progress = createSignal(0);
  const number = createSignal(0);
  view.add(<Rect width={SCREEN_WIDTH- SCREEN_BORDER*2} height={SCREEN_HEIGHT - SCREEN_BORDER*2} ref={container}
                 scale={screen().scale} radius={45} clip={true} opacity={0}>
    <Video ref={video} play={true} src="/video.mp4" radius={300}
           width={SCREEN_WIDTH - SCREEN_BORDER*2 - 50} y={500} scale={0.5} zIndex={5}/>
    <Circle size={SCREEN_WIDTH - SCREEN_BORDER*2 - 25} stroke="white" lineWidth={5} lineCap="round" y={-50}
            startAngle={-90} endAngle={createSignal(() => progress()*360-90)}/>
    <Img src="/video-bar.svg" width={SCREEN_WIDTH - SCREEN_BORDER * 2} y={SCREEN_HEIGHT/2-52} offsetY={1}/>
    <Txt fill="#999798" offsetX={-1}
         y={SCREEN_HEIGHT/2-87} x={-SCREEN_WIDTH/2+100}
         fontSize={25} fontFamily="Roboto" fontWeight={500}
         text={createSignal(()=> "0:"+Math.round(progress() * 60).toString().padStart(2, '0')
            +","+(Math.round(progress() * 600) % 10).toString())}/>
    <Img src="/send-ellipse.svg" x={SCREEN_WIDTH/2-65} y={SCREEN_HEIGHT/2-100} width={150}/>
    <Img ref={button} src="/send-notlocked.svg" x={SCREEN_WIDTH/2-65} y={SCREEN_HEIGHT/2-100} width={150}/>
    <Img src="/navbar.svg"
         width={SCREEN_WIDTH - SCREEN_BORDER}
         y={SCREEN_HEIGHT/2}
         offsetY={1}/>
    <Img ref={lock} src="/lock-video.svg" offsetY={1} width={60} x={SCREEN_WIDTH/2-65} y={SCREEN_HEIGHT/2-210}/>
    <Rect ref={counter} fill="white" radius={50} width={110} height={45} y={465} opacity={0}>
      <Txt fontFamily="Roboto" fontWeight={500} fontSize={25} y={3}
           fill="#A26062" text={createSignal(() => number().toString() + " / 10")}/>
    </Rect>
  </Rect>);

  yield* all(
      screen().setBlur(true),
      container().opacity(1, 0.3, easeInOutCubic),
      video().y(-50, 0.3, easeInOutCubic),
      video().scale(1, 0.3, easeInOutCubic),
  );

  yield progress(1, 4, linear);
  yield* waitFor(0.2);
  yield click().endScroll(205, 235);
  yield *all(
      waitFor(0.2),
      lock().y(lock().y() - 80, 0.2, easeInOutCubic)
  );
  yield *lock().y(lock().y() + 80, 0.2, easeInOutCubic);
  lock().src("/locked-video.svg");

  yield* button().scale(0, 0.1, easeInOutCubic);
  button().src("/send.svg");
  yield* button().scale(1, 0.1, easeInOutCubic);

  yield* waitFor(3.3);
  progress(0);
  yield progress(1, 4, linear);
  const video1 = createRef<Video>();
  container().add(
      <Video ref={video1} play={false} src="/video.mp4" radius={300} opacity={0.8}
             width={SCREEN_WIDTH - SCREEN_BORDER*2 - 50} y={0} zIndex={1}/>
  );
  video1().seek(4);
  yield counter().opacity(1, 0.2, easeInOutCubic);
  number(2);
  yield all(
      video1().scale(0.25, 0.3, easeInOutCubic),
      video1().y(350, 0.3, easeInOutCubic),
      video1().x(-210, 0.3, easeInOutCubic),
  );
  yield* waitFor(4);

  progress(0);
  yield progress(1, 4, linear);
  const video2 = createRef<Video>();
  container().add(
      <Video ref={video2} play={false} src="/video.mp4" radius={300} opacity={0.8} scale={0.85}
             width={SCREEN_WIDTH - SCREEN_BORDER*2 - 50} y={0} zIndex={1}/>
  );
  video2().seek(8);
  number(3);
  yield all(
      video2().scale(0.25, 0.3, easeInOutCubic),
      video2().y(350, 0.3, easeInOutCubic),
      video2().x(-160, 0.3, easeInOutCubic),
  );
  yield* waitFor(4);

  yield* click().click(205, 435);
  yield* click().endClick();

  yield *all(
      screen().setBlur(false),
      container().opacity(0, 0.2, easeInOutCubic),
  );
  const message = createRef<Rect>();
  const videoMessage = createRef<Video>();
  const v1 = createRef<Video>();
  const v2 = createRef<Video>();
  const circleProgress = createRef<Circle>();
  const progressIndicator = createRef<Rect>();
  const bar1 = createRef<Rect>();
  const bar2 = createRef<Rect>();
  const bar3 = createRef<Rect>();
  const unread = createRef<Circle>();
  const bars = createRef<Rect>();
  progress(3);
  chat().add(<Rect y={550} x={SCREEN_WIDTH/2 - SCREEN_BORDER-10}>
    <Rect ref={message} height={300} offsetY={-1}>
      <Video ref={v2} play={false} src="/video.mp4" radius={300} opacity={0.4} scale={0.9} x={-160}/>
      <Video ref={v1} play={false} src="/video.mp4" radius={300} opacity={0.6} scale={0.9} x={-160}/>
      <Video ref={videoMessage} src="/video.mp4" radius={300} offsetX={1} zIndex={1}
             shadowColor={"rgba(0,0,0,0.45)"}/>
      <Circle ref={circleProgress} size={350} stroke={"rgba(255,255,255,0.66)"} lineWidth={0} lineCap="round" offsetX={1} zIndex={1} x={-5}
              startAngle={-90} endAngle={createSignal(() => progress()*360-90)}/>
    </Rect>
    <Rect zIndex={2} layout x={-40} gap={5} y={-65} fill={"rgba(0,0,0,0.29)"} paddingLeft={5} paddingRight={5} radius={10}>
      <Txt fill={"white"} fontFamily="Roboto" fontSize={19} fontWeight={300} marginTop={5}>9:05</Txt>
      <Img src={"/read-video.svg"} size={22} marginTop={3}/>
    </Rect>
    <Rect ref={progressIndicator} zIndex={2} layout x={-310} gap={5} y={-65} fill={"rgba(0,0,0,0.29)"} paddingLeft={5} paddingRight={5} radius={10}>
      <Txt fill={"white"} fontFamily="Roboto" fontSize={19} fontWeight={300} marginTop={5}
           text={createSignal(()=> Math.floor(progress()).toString().padStart(2, '0')+":"
               +(Math.floor(progress()%1 * 60) %60).toString().padStart(2, '0'))}/>
      {/*<Img src={"/read-video.svg"} size={22} marginTop={3}/>*/}
      <Rect ref={bars} layout gap={2} marginBottom={6} alignItems="end" opacity={0} marginRight={3}>
        <Rect ref={bar1} fill={"white"} height={15} width={3}/>
        <Rect ref={bar2} fill={"white"} height={15} width={3}/>
        <Rect ref={bar3} fill={"white"} height={15} width={3}/>
      </Rect>
      <Circle ref={unread} size={8} fill="white" layout={false} x={25}/>
    </Rect>
  </Rect>);
  const anims = [];
  const random = useRandom();
  for (let i = 0; i < 88; i++) {
    anims.push(all(
        bar1().height(random.nextInt(5, 15), 0.15, linear),
        bar2().height(random.nextInt(5, 15), 0.15, linear),
        bar3().height(random.nextInt(5, 15), 0.15, linear),
    ));
  }
  yield chain(...anims);
  v1().seek(8);
  v2().seek(4);
  yield all(
      message().y(message().y() - 380, 0.3, easeInOutCubic),
      messages().y(messages().y() - 380, 0.3, easeInOutCubic),
  );
  yield* waitFor(0.5);
  videoMessage().play();
  progress(0);
  yield progress(1, 4, linear);
  yield all(
      unread().opacity(0, 0.3, easeInOutCubic),
      bars().opacity(1, 0.3, easeInOutCubic),
      circleProgress().lineWidth(5, 0.3, easeInOutCubic),
      videoMessage().shadowBlur(10, 0.3, easeInOutCubic),
      message().scale(1.4, 0.3, easeInOutCubic),
      messages().y(messages().y() - 180, 0.3, easeInOutCubic),
      message().y(message().y() - 150, 0.3, easeInOutCubic),
      v1().x(-260, 0.3, easeInOutCubic),
      v2().x(-300, 0.3, easeInOutCubic),
      progressIndicator().x(-450, 0.3, easeInOutCubic),
  );
  yield* waitFor(4);
  yield* all(
      videoMessage().x(370, 0.3, easeInOutCubic),
      circleProgress().x(370, 0.3, easeInOutCubic),
      v1().opacity(1, 0.3, easeInOutCubic),
      v1().scale(1.01, 0.3, easeInOutCubic),
      v1().x(-180, 0.3, easeInOutCubic),
      v2().x(-260, 0.3, easeInOutCubic),
      v2().opacity(0.6, 0.3, easeInOutCubic),
  );
  yield progress(2, 4, linear);
  v1().play();
  circleProgress().x(-5);
  yield* waitFor(4);
  yield* all(
      v1().x(370, 0.3, easeInOutCubic),
      circleProgress().x(370, 0.3, easeInOutCubic),
      v2().opacity(1, 0.3, easeInOutCubic),
      v2().scale(1.01, 0.3, easeInOutCubic),
      v2().x(-180, 0.3, easeInOutCubic),
  );
  yield progress(3, 4, linear);
  v2().play();
  circleProgress().x(-5);
  yield* waitFor(4.01);

  v2().pause();
  v2().seek(0);
  progress(3);
  yield circleProgress().opacity(0, 0.1, easeInOutCubic);
  yield all(
      videoMessage().shadowBlur(0, 0.3, easeInOutCubic),
      message().scale(1, 0.3, easeInOutCubic),
      progressIndicator().x(-310, 0.3, easeInOutCubic),
      messages().y(messages().y() + 180, 0.3, easeInOutCubic),
      message().y(message().y() + 150, 0.3, easeInOutCubic),
  );

  yield* waitFor(1);
  yield* tween(0.8, value => {
    title().position.y(map(-425, 0, easeOutExpo(value)));
    screen().position.y(map(150, 800, easeOutExpo(value)));
  });
});
