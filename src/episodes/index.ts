// Episode composition registry. Add real episodes here as
// <Slug>S01 .. <Slug>S10, one composition per segment, each in
// src/episodes/<slug>-sNN/ with episode.json, index.tsx, shots.tsx,
// timeline.json and words.json. TestS01 is the render smoke test.
export const EPISODE_COMPOSITIONS = ['TestChunk', 'TestS01', 'MoonDisappearedS01', 'MoonDisappearedS02', 'MoonDisappearedS03', 'MoonDisappearedS04', 'MoonDisappearedS05', 'MoonDisappearedS06', 'MoonDisappearedS07', 'MoonDisappearedS08', 'MoonDisappearedS09', 'MoonDisappearedS10', 'CatGirlSampleS01', 'CatGirlSampleV2S01', 'TalkToAnimalsSampleS01'] as const;
