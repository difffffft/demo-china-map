export default function InfoBox({ left = true }: { left?: boolean }) {
  return (
    <div
      className={
        "info-box absolute top-[10vh] bottom-[10vh] w-[20vw] max-w-[410px]" +
        " " +
        (left ? "left-[6vh] " : "right-[6vh] transform -scale-x-100")
      }
      style={{
        background: "url(/assets/bg5.png) no-repeat center center",
        backgroundSize: "100% 100%",
      }}
    ></div>
  );
}


// screenW - (6vh * 2 + boxW * 2)