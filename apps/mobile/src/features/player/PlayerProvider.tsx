import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react";

import { resolvePdfViewerSource } from "@/features/assets/pdf-viewer-source";
import { useSupabaseSession } from "@/features/auth/SupabaseSessionProvider";
import { useSessionPreview } from "@/features/auth/SessionProvider";
import { useSubscriptionPreview } from "@/features/subscription/SubscriptionPreviewProvider";
import { resolveAssetAccess } from "@/features/subscription/premium-access";
import { supabaseConfig } from "@/services/supabase/client";

import {
  getNextTrackIndex,
  getPreviousTrackIndex,
  toggleRepeatMode,
  type PlayableTrack,
  type RepeatMode,
} from "./playback-queue";

type PlayerContextValue = {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  message: string | null;
  playQueue: (queue: PlayableTrack[], startIndex: number) => void;
  repeatMode: RepeatMode;
  skipNext: () => void;
  skipPrevious: () => void;
  stop: () => void;
  toggleRepeat: () => void;
  togglePlayPause: () => void;
  track: PlayableTrack | null;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: PropsWithChildren) {
  const { session: supabaseSession } = useSupabaseSession();
  const { session } = useSessionPreview();
  const { hasActiveSubscription } = useSubscriptionPreview();
  const isAuthenticated = session.status === "signed_in" || supabaseSession.status === "authenticated";

  const [queue, setQueue] = useState<PlayableTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const requestId = useRef(0);

  const player = useAudioPlayer(audioUrl ?? undefined);
  const status = useAudioPlayerStatus(player);
  const track = currentIndex !== null ? (queue[currentIndex] ?? null) : null;

  useEffect(() => {
    void setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  useEffect(() => {
    if (!track) {
      setAudioUrl(null);
      return;
    }

    const access = resolveAssetAccess(
      { id: track.assetId, path: track.storagePath, premium: track.premium, title: track.title, type: "audio" },
      { hasActiveSubscription, isAuthenticated },
    );

    if (!access.canAccess) {
      setAudioUrl(null);
      setMessage(access.message);
      return;
    }

    setMessage(null);
    const thisRequest = ++requestId.current;

    void resolvePdfViewerSource({
      accessToken: supabaseSession.accessToken,
      allowPublicFallback: true,
      assetId: track.assetId,
      bucket: supabaseConfig.assetBucket,
      functionsUrl: supabaseConfig.functionsUrl,
      premium: track.premium,
      storagePath: track.storagePath,
      supabaseUrl: supabaseConfig.url,
    }).then((result) => {
      if (requestId.current !== thisRequest) {
        return;
      }

      if (result.status === "ready") {
        setAudioUrl(result.url);
        return;
      }

      setAudioUrl(null);
      setMessage(result.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.assetId, hasActiveSubscription, isAuthenticated, supabaseSession.accessToken]);

  useEffect(() => {
    if (audioUrl) {
      player.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  useEffect(() => {
    if (!status.didJustFinish || currentIndex === null) {
      return;
    }

    const nextIndex = getNextTrackIndex(queue.length, currentIndex, repeatMode);

    if (nextIndex === null) {
      setCurrentIndex(null);
      return;
    }

    if (nextIndex === currentIndex) {
      player.seekTo(0);
      player.play();
      return;
    }

    setCurrentIndex(nextIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.didJustFinish]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      currentTime: status.currentTime,
      duration: status.duration,
      isPlaying: status.playing,
      message,
      playQueue: (nextQueue, startIndex) => {
        setQueue(nextQueue);
        setCurrentIndex(startIndex);
      },
      repeatMode,
      skipNext: () => {
        if (currentIndex === null) {
          return;
        }

        const nextIndex = getNextTrackIndex(queue.length, currentIndex, "all");

        if (nextIndex !== null) {
          setCurrentIndex(nextIndex);
        }
      },
      skipPrevious: () => {
        if (currentIndex === null) {
          return;
        }

        const previousIndex = getPreviousTrackIndex(queue.length, currentIndex, "all");

        if (previousIndex !== null) {
          setCurrentIndex(previousIndex);
        }
      },
      stop: () => {
        player.pause();
        setQueue([]);
        setCurrentIndex(null);
      },
      toggleRepeat: () => setRepeatMode((current) => toggleRepeatMode(current)),
      togglePlayPause: () => {
        if (status.playing) {
          player.pause();
          return;
        }

        player.play();
      },
      track,
    }),
    [currentIndex, message, player, queue.length, repeatMode, status.currentTime, status.duration, status.playing, track],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must run inside PlayerProvider.");
  }

  return context;
}

