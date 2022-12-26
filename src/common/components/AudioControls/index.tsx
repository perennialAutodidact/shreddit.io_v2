import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import AudioClient from "common/services/AudioClient";
import {
  TfiControlPlay,
  TfiControlPause,
  TfiControlStop,
} from "react-icons/tfi";
import { Note } from "ts/musicTheory";
import * as Tone from "tone";
import { setAudioData } from "store/audioClientSlice";
import LoadingIndicator from "common/components/LoadingIndicator";
import { getScaleData } from "common/utils/getScaleData";
import { getScalePitches } from "common/utils/getScalePitches";

const teoria = require("teoria");

type AudioControlsProps = {
  audioClient: AudioClient | undefined;
  isLoaded: boolean;
};

const AudioControls = ({ audioClient, isLoaded }: AudioControlsProps) => {
  global.tone = { ...Tone };
  const appDispatch = useAppDispatch();
  const { scale, currentKey } = useAppSelector(
    (appState) => appState.musicTheory
  );
  const { audioData } = useAppSelector((appState) => appState.audioClient);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const pitchesToPlay = getScalePitches(
      currentKey.replace("1", "3") as Note,
      scale.name
    );

    appDispatch(
      setAudioData({
        rhythmDurations: pitchesToPlay.map((n) => "4n"),
        pitchesToPlay,
      })
    );
  }, [scale]);

  const togglePlayAudio = useCallback(async (): Promise<void> => {
    if (audioClient) {
      if (!isPlaying) {
        await audioClient.play({
          onEnd: () => {
            setIsPlaying(false);
          },
          audioData,
        });
        setIsPlaying(true);
      } else {
        audioClient.pause();
        setIsPlaying(false);
      }
    }
  }, [audioData, isPlaying, audioClient]);

  const stopAudio = async (): Promise<void> => {
    if (audioClient) {
      setIsPlaying(false);
      audioClient.stop();
    }
  };

  return (
    <div>
      {isLoaded ? (
        <div className="fs-1">
          <span data-test-id="PlayAudioButton" onClick={togglePlayAudio}>
            {isPlaying ? <TfiControlPause /> : <TfiControlPlay />}
          </span>
          <span data-test-id="StopAudioButton" onClick={stopAudio}>
            <TfiControlStop />
          </span>
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};

export default AudioControls;
