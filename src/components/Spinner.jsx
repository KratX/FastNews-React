import ClockLoader from "react-spinners/ClockLoader";

export function Spinner() {
  return (
    <div>
      <ClockLoader color="#000000" loading size={50} speedMultiplier={2} />
    </div>
  );
}
