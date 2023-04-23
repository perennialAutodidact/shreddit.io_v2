import { useContext, useMemo } from "react";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { useAppSelector } from "store/hooks";
import StringedInstrument from "components/StringedInstrument";
import IntervalDisplay from "components/IntervalDisplay";
import { useAudioClient } from "common/hooks/useAudioClient";
import AudioControls from "common/components/AudioControls";
import UtilityBar from "components/UtilityBar";
import { BreakpointState } from "ts/breakpoints";

const ScaleExplorerPage = () => {
  const { versionNumbers } = useAppSelector((appState) => appState.app);
  const {
    dimensions: { neck },
  } = useAppSelector((appState) => appState.instrument);
  const { scale } = useAppSelector((appState) => appState.musicTheory);

  const audioClientProps = useAudioClient();

  const { isPortrait } = useContext<BreakpointState>(BreakpointContext);
  const intervalMarkerSize = useMemo(
    () => (isPortrait ? neck.width : neck.height) / scale.notes.length / 2,
    [isPortrait, neck, scale.notes.length]
  );

  return (
    <div className="container-fluid position-relative">
      <div className="row my-2">
        <AudioControls {...audioClientProps} />
      </div>
      <div className="row mb-3 mb-lg-5">
        <StringedInstrument />
      </div>
      <div className="row mb-lg-3">
        <IntervalDisplay markerSize={intervalMarkerSize} />
      </div>
      <div className="row my-3">
        <UtilityBar />
      </div>
      <div className="row text-muted">v{versionNumbers.scaleExplorer}</div>
    </div>
  );
};

export default ScaleExplorerPage;
