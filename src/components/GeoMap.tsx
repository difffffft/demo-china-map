import { useEffect, useRef } from "react";
import * as d3 from "d3";

const GeoMap = ({
  geoData,
  width,
  height,
}: {
  geoData: any;
  width: number;
  height: number;
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (geoData && svgRef.current) {
      const svg = d3.select(svgRef.current);

      // 清除现有内容
      svg.selectAll("*").remove();

      // 创建投影
      const projection = d3.geoMercator().fitSize([width, height], geoData);
      // 创建路径生成器
      const path = d3.geoPath().projection(projection) as any;

      // 创建组
      const mapGroup = svg.append("g");

      // 定义线性渐变
      const gradient = mapGroup
        .append("defs")
        .append("linearGradient")
        .attr("id", "map-gradient")
        .attr("x1", "50%")
        .attr("y1", "0%")
        .attr("x2", "50%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#05A1E6");

      gradient
        .append("stop")
        .attr("offset", "80%")
        .attr("stop-color", "#364594");

      // 创建蒙版
      const mask = mapGroup
        .append("defs")
        .append("mask")
        .attr("id", "map-mask");

      // 渲染地图到蒙版
      mask
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "white");

      // 渲染阴影地图（蓝色，向下偏移10px）

      mapGroup
        .append("g")
        .attr("transform", "translate(0, 22)")
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#108DD3")
        .attr("opacity", 1);

      mapGroup
        .append("g")
        .attr("transform", "translate(0, 16)")
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#062087")
        .attr("opacity", 1);

      // 渲染实际的地图
      mapGroup
        .append("g")
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#ccc")
        .attr("stroke", "#fff");

      // 添加带蒙版的渐变层
      mapGroup
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "url(#map-gradient)")
        .style("opacity", 0.6)
        .attr("mask", "url(#map-mask)");
    }
  }, [geoData, width]);

  return <svg ref={svgRef} width={width} height={height + 50}></svg>;
};

export default GeoMap;
