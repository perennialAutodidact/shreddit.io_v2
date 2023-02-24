import { useAppSelector } from "store/hooks";
import StringedInstrument from "components/StringedInstrument";
import IntervalDisplay from "components/IntervalDisplay";

const ScaleExplorerPage = () => {
  const { versionNumbers } = useAppSelector((appState) => appState.app);
  return (
    <div className="container position-relative">
      <div className="row mb-3 mb-lg-5">
        <StringedInstrument />
      </div>
      <div className="row mb-lg-3">
        <IntervalDisplay markerSize={35} />
      </div>
      <div className="row text-muted">v{versionNumbers.scaleExplorer}</div>
    </div>
  );
};

export default ScaleExplorerPage;
