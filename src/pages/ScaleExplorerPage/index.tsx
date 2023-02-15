import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import StringedInstrument from "components/StringedInstrument";
import IntervalDisplay from "components/IntervalDisplay";
import AudioControls from "common/components/AudioControls";
import AudioClient from "common/services/AudioClient";

const ScaleExplorerPage = () => {
  const [audioClientLoaded, setAudioClientLoaded] = useState<boolean>(false);

  const audioClient = useRef<AudioClient>();

  useEffect(() => {
    if (window.AudioBuffer && !audioClient.current) {
      audioClient.current = new AudioClient({
        Tone,
        instrument: "salamander",
        onLoad: () => {
          setAudioClientLoaded(true);
        },
      });
    }
    return () => audioClient.current && audioClient.current.cleanup();
  }, []);

  return (
    <div className="container position-relative">
      <div className="row mb-3 mb-lg-5">
        <StringedInstrument />
      </div>
      <div className="row mb-3">
        <IntervalDisplay markerSize={35} />
      </div>
      <div className="row mb-3">
        <AudioControls
          audioClient={audioClient.current}
          isLoaded={audioClientLoaded}
        />
      </div>
    </div>
  );
};

export default ScaleExplorerPage;
