import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import AudioClient from "common/services/AudioClient";

export const useAudioClient = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const audioClientRef = useRef<AudioClient>();

  useEffect(() => {
    if (window.AudioBuffer && !audioClientRef.current) {
      audioClientRef.current = new AudioClient({
        Tone,
        instrument: "salamander",
        onLoad: () => {
          setIsLoaded(true);
        },
      });
    }
    return () => audioClientRef.current && audioClientRef.current.cleanup();
  }, []);

  return {
    isLoaded,
    audioClient: audioClientRef.current ? audioClientRef.current : null,
  };
};
