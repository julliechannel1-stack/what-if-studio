import {Config} from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Meta Chrome 157 renames/forces the Local Network Access check under the
// feature name `local-network-access-check` (stock Chromium name
// `LocalNetworkAccessChecks`, which Remotion already disables, does not
// cover it). Without this, navigation to the local render server
// (http://localhost:3000) fails with
// net::ERR_BLOCKED_BY_LOCAL_NETWORK_ACCESS_CHECKS. Added by render probe
// 2026-11-19. Original backed up at remotion.config.ts.bak.
Config.setChromiumFeatures({'local-network-access-check': false});
