import "./Loading.css";

export default function LoadingAnimation() {
  return (
    <>
      <ul role="progressbar" aria-busy="true" aria-label="Loading domino shop">
        <li role="presentation"></li>
        <li role="presentation"></li>
        <li role="presentation"></li>
        <li role="presentation"></li>
        <li role="presentation"></li>
        <li role="presentation"></li>
        <li role="presentation"></li>
      </ul>
    </>
  );
}
