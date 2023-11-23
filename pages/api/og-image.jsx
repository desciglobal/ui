import { ImageResponse } from "@vercel/og";
import React from "react";

const websiteUrl = "https://www.desci.global/";

const font = fetch(
  new URL(
    `${websiteUrl}/fonts/ABC_Monument_Grotesk/ABCMonumentGrotesk-Medium.otf`,
    import.meta.url
  )
).then((res) => res.arrayBuffer());

const events = fetch(
  new URL(
    `${websiteUrl}/api/hygraph/getFeaturedEvents`,
    import.meta.url
  )
).then((res) => res.json());

export const config = {
  runtime: "experimental-edge",
};

export default async function ogImage() {
  const fontData = await font;
  const sortedEvents = await events;

  return new ImageResponse(
    (
      <div tw="flex h-full s">
        <div tw="flex flex-col w-1/2 p-[48px] bg-[#FFFFFF]">
          <div tw="flex h-10">
            <img
              tw="h-full"
              src={`${websiteUrl}/images/dynamic-og/og-logo-small.svg`}
              alt="Prism"
            />
          </div>
          <h1 tw="text-[52px]">Join global DeSci Events</h1>
          <div tw="flex w-full mt-10 justify-between h-10 text-2xl items-center border-solid border-t border-black">
            <div>{sortedEvents[0].eventTitle.slice(0, 35)}</div>
            <div>View Dates</div>
          </div>
          <div tw="flex w-full mt-10 justify-between h-10 text-2xl items-center border-solid border-t border-black">
            <div>{sortedEvents[1].eventTitle.slice(0, 35)}</div>
            <div>View Dates</div>
          </div>
          <div tw="flex w-full mt-10 justify-between h-10 text-2xl items-center border-solid border-t border-black">
            <div>{sortedEvents[2].eventTitle.slice(0, 35)}</div>
            <div>View Dates</div>
          </div>
          <div tw="flex h-10 bg-[#1231D5] mt-10 p-2 text-white rounded-full w-full items-center text-xl justify-center">
            Join the Network
          </div>
        </div>
        <div tw="flex w-1/2 h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            tw="w-full h-full"
            src={`${websiteUrl}/images/dynamic-og/og-logo.png`}
            alt="Prism"
          />
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 500,
        },
      ],
    }
  );
}
