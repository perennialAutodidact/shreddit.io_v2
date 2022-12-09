import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import AudioClient from "common/services/AudioClient";
import { TfiControlPlay, TfiControlPause } from "react-icons/tfi";
import * as Tone from "tone";
import { Sampler } from "tone";
import LoadingIndicator from "components/LoadingIndicator";

type AudioControlsProps = {
  audioClient: AudioClient | undefined;
  isLoaded: boolean;
};

const AudioControls = ({ audioClient, isLoaded }: AudioControlsProps) => {
  global.tone = { ...Tone };
  const appDispatch = useAppDispatch();
  const { currentInstrument } = useAppSelector((appState) => appState.app);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const sampler = useRef<Sampler>();

  useEffect(() => {
    if (window.AudioBuffer) {
      // if (audioClient && isPlaying) {
      //   (async () => {
      //     await audioClient.play({});
      //   })();
      // }

      return () => audioClient && audioClient.cleanup();
    }
  }, [audioClient, isPlaying]);

  const play = async () => {
    if (audioClient) {
      // await audioClient.start();
      await audioClient.play({});
      console.log(audioClient);
      // setIsPlaying(true);
    }
  };

  return (
    <div>
      {isLoaded ? (
        <div className="fs-1" onClick={play} data-testid="PlayAudioButton">
          <TfiControlPlay />
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};

export default AudioControls;
