import React from 'react';
import {Composition} from 'remotion';
import {TestScene} from './episodes/test-s01/shots';
import {MoonDisappearedS01} from './episodes/moon-disappeared-s01';
import {MoonDisappearedS02} from './episodes/moon-disappeared-s02';
import {MoonDisappearedS03} from './episodes/moon-disappeared-s03';
import {MoonDisappearedS04} from './episodes/moon-disappeared-s04';
import {MoonDisappearedS05} from './episodes/moon-disappeared-s05';
import {MoonDisappearedS06} from './episodes/moon-disappeared-s06';
import {MoonDisappearedS07} from './episodes/moon-disappeared-s07';
import {MoonDisappearedS08} from './episodes/moon-disappeared-s08';
import {MoonDisappearedS09} from './episodes/moon-disappeared-s09';
import {MoonDisappearedS10} from './episodes/moon-disappeared-s10';
import {CatGirlSampleS01} from './episodes/cat-girl-sample-s01';
import {CatGirlSampleV2S01} from './episodes/cat-girl-sample-v2-s01';
import {TalkToAnimalsSampleS01} from './episodes/talk-to-animals-sample-s01';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TestChunk"
        component={TestScene}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TestS01"
        component={TestScene}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS01"
        component={MoonDisappearedS01}
        durationInFrames={1910}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS02"
        component={MoonDisappearedS02}
        durationInFrames={1861}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS03"
        component={MoonDisappearedS03}
        durationInFrames={1786}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS04"
        component={MoonDisappearedS04}
        durationInFrames={1761}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS05"
        component={MoonDisappearedS05}
        durationInFrames={1703}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS06"
        component={MoonDisappearedS06}
        durationInFrames={1786}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS07"
        component={MoonDisappearedS07}
        durationInFrames={1804}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS08"
        component={MoonDisappearedS08}
        durationInFrames={1848}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS09"
        component={MoonDisappearedS09}
        durationInFrames={1729}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MoonDisappearedS10"
        component={MoonDisappearedS10}
        durationInFrames={1825}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CatGirlSampleS01"
        component={CatGirlSampleS01}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CatGirlSampleV2S01"
        component={CatGirlSampleV2S01}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TalkToAnimalsSampleS01"
        component={TalkToAnimalsSampleS01}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
