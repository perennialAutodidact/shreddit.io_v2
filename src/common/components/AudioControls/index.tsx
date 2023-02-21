import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import AudioClient from "common/services/AudioClient";
import {
  TfiControlPlay,
  TfiControlPause,
  TfiControlStop,
} from "react-icons/tfi";
import { Note, Chord } from "ts/musicTheory";
import * as Tone from "tone";
import { setActivePitch, setAudioData } from "store/audioClientSlice";
import LoadingIndicator from "common/components/LoadingIndicator";
import { getScalePitches } from "common/utils/getScalePitches";

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
  }, [scale, currentKey, appDispatch]);

  const togglePlayAudio = useCallback(async (): Promise<void> => {
    if (audioClient) {
      if (!isPlaying) {
        await audioClient.play({
          audioData,
          onEnd: () => {
            setIsPlaying(false);
            appDispatch(setActivePitch(null));
          },
          onChangePitch: (noteOrChord: Note | Chord) => {
            appDispatch(setActivePitch(noteOrChord));
          },
        });

        setIsPlaying(true);
      } else {
        audioClient.pause();
        setIsPlaying(false);
      }
    }
  }, [audioData, isPlaying, audioClient, appDispatch]);

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
