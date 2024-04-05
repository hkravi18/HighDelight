import { GridLoader, HashLoader, SyncLoader } from "react-spinners";
import "../styles/LoadingScreen.css";

interface LoadingScreenProps {
  message: string;
  loaderColor: string;
  messageColor: string;
}

//export loading screens `GridLoadingScreen`, `HashLoadingScreen` and `SyncLoadingScreen`
const GridLoadingScreen = ({
  message,
  loaderColor,
  messageColor,
}: LoadingScreenProps) => {
  return (
    <>
      <div className="gridLoadingContainer">
        <GridLoader
          color={loaderColor || "#000"}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loader"
          size={20}
        />
        <p className="gridLoadingText" style={{ color: messageColor }}>
          {message || "Loading..."}
        </p>
      </div>
    </>
  );
};

const HashLoadingScreen = ({
  message,
  loaderColor,
  messageColor,
}: LoadingScreenProps) => {
  return (
    <>
      <div className="gridLoadingContainer">
        <HashLoader
          color={loaderColor || "#000"}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loader"
          size={60}
        />
        <p className="syncLoadingText" style={{ color: messageColor }}>
          {message || "Loading..."}
        </p>
      </div>
    </>
  );
};

const SyncLoadingScreen = ({
  message,
  loaderColor,
  messageColor,
}: LoadingScreenProps) => {
  return (
    <>
      <div className="syncLoadingContainer">
        <SyncLoader
          color={loaderColor || "#000"}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loader py-20"
          size={25}
        />
        <p className="syncLoadingText" style={{ color: messageColor }}>
          {message || "Loading..."}
        </p>
      </div>
    </>
  );
};

export { GridLoadingScreen, HashLoadingScreen, SyncLoadingScreen };
