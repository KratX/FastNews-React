import ClockLoader from "react-spinners/ClockLoader";

export function Spinner() {
  return (
    <div>
      <ClockLoader color="#ff717e" loading size={50} speedMultiplier={2} />
    </div>
  );
}
