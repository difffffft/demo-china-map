"use client";
import GeoMap from "@/components/GeoMap";
import InfoBox from "@/components/InfoBox";
import { getMapSize } from "@/utils/getMapSize";
import { useEffect, useState } from "react";

export default function Home() {
  let [mapWidth, setMapWidth] = useState(0);
  let [mapHeight, setMapHeight] = useState(0);
  let [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // 获取数据
    fetch("/china.json")
      .then((response) => response.json())
      .then((data) => {
        setGeoData(data);
      });

    const GetMapSize = () => {
      [mapWidth, mapHeight] = getMapSize();
      // 计算坐标
      setMapWidth(mapWidth);
      setMapHeight(mapHeight);
      return getMapSize();
    };

    GetMapSize();
    window.addEventListener("resize", GetMapSize);
    return () => {
      window.removeEventListener("resize", GetMapSize);
    };
  }, []);

  return (
    <main className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <div id="map" className="relative">
        {geoData && (
          <GeoMap geoData={geoData} width={mapWidth} height={mapHeight} />
        )}
      </div>
      <InfoBox></InfoBox>
      <InfoBox left={false}></InfoBox>
      <div className="absolute left-1/2 -translate-x-1/2 top-3 text-5xl text-white font-ysbth tracking-widest">智慧工地管理平台</div>
      <div
        className="absolute bottom-0 left-0 w-full h-full z-[-1]"
        style={{
          boxShadow: "inset 0px 1px 83px 132px rgba(0, 61, 110, 0.35)",
        }}
      ></div>
      <div
        className="absolute bottom-[50%] left-[50%] z-[-2] translate-y-1/2 -translate-x-1/2"
        style={{
          width: mapWidth * 1.2 + "px",
          height: mapWidth * 1.2 + "px",
          background: "url(/assets/bg2.png) no-repeat center center",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="absolute bottom-[50%] left-[50%] z-[-3] translate-y-1/2 -translate-x-1/2"
        style={{
          width: mapWidth * 1.2 + "px",
          height: mapWidth * 1.2 + "px",
          background: "url(/assets/earth.png) no-repeat center center",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-full z-[-4]"
        style={{
          background: "url(/assets/bg3.png) no-repeat center center",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-full z-[-1]"
        style={{
          background: "url(/assets/bg4.png) no-repeat center center",
          backgroundSize: "100% 100%",
        }}
      ></div>
    </main>
  );
}
