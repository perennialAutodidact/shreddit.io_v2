import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import AudioClient from "common/services/AudioClient";

export const useAudioClient = () => {
  const [audioClientLoaded, setAudioClientLoaded] = useState<boolean>(false);

  const audioClientRef = useRef<AudioClient>();

  useEffect(() => {
    if (window.AudioBuffer && !audioClientRef.current) {
      audioClientRef.current = new AudioClient({
        Tone,
        instrument: "salamander",
        onLoad: () => {
          setAudioClientLoaded(true);
        },
      });
    }
    return () => audioClientRef.current && audioClientRef.current.cleanup();
  }, []);

  return {
    audioClientLoaded,
    audioClient: audioClientRef.current ? audioClientRef.current : null,
  };
};
