"use client";
import React from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker,
} from "react-simple-maps";
import centroid from "@turf/centroid";
import { motion } from "framer-motion";
import { IObj } from "@/utils/types";

const geoUrl = "/geography.json";

interface Props {
  className?: string;
  countries?: IObj[];
}
const MapChart = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative w-full overflow-hidden rounded-xl"
    >
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        className="transition-transform duration-300 ease-in-out"
      >
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        >
          <Sphere
            stroke="#E4E5E6"
            strokeWidth={0.5}
            fill="#F5F4F6"
            id="sphere"
          />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        </motion.g>
        <Geographies
          geography={geoUrl}
          style={{
            pointerEvents: "none",
          }}
        >
          {({ geographies }) =>
            geographies.map((geo: any, index: number) => {
              const existedCountry = (props.countries || []).find((country) => {
                return country.iso === geo.properties["ISO3166-1-Alpha-3"];
              });
              const center = centroid(geo);
              const coordinates = center.geometry.coordinates;
              // console.log(
              //   "🚀 ~ geographies.map ~ getGeoCountry:",
              //   getGeoCountry
              // );
              return (
                <motion.g
                  key={geo.rsmKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.01,
                    ease: "easeOut",
                  }}
                >
                  <Geography
                    geography={geo}
                    fill={existedCountry ? "#f79e8f" : "transparent"}
                    style={{
                      default: {
                        transition: "all 0.1s ease",
                        stroke: "#E4E5E6",
                        strokeWidth: 0.5,
                        outline: "none",
                        zIndex: 1,
                      },
                      hover: {
                        stroke: "#FFF",
                        strokeWidth: 1,
                        outline: "none",
                      },
                    }}
                    strokeLinecap="round"
                  />
                  {existedCountry && (
                    <Marker coordinates={coordinates as any}>
                      <motion.g
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.2, y: -2 }}
                        transition={{
                          delay: index * 0.01 + 0.5,
                          duration: 0.2,
                        }}
                        style={{
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                          zIndex: 99999999,
                          cursor: "pointer",
                        }}
                      >
                        <circle
                          r={5}
                          fill="#FF6B6B"
                          stroke="white"
                          strokeWidth={1.5}
                        />
                        <text
                          textAnchor="middle"
                          y={-12}
                          style={{
                            fontFamily: "Inter, system-ui",
                            fontSize: "11px",
                            fontWeight: "600",
                            fill: "#2D3748",
                            filter:
                              "drop-shadow(0 1px 1px rgba(255,255,255,0.8))",
                          }}
                        >
                          {existedCountry.country}
                        </text>
                      </motion.g>
                    </Marker>
                  )}
                </motion.g>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </motion.div>
  );
};

export default MapChart;
