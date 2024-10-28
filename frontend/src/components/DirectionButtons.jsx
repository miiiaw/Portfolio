export default function DirectionButtons({
  projectsDirection,
  setProjectsDirection,
}) {
  const handleProjectsDirection = (event) => {
    setProjectsDirection(event.target.value);
  };

  return (
    <>
      <div className="directionButtonsContainer">
        <label>
          <input
            type="radio"
            value="vertical"
            checked={projectsDirection === "vertical"}
            onChange={handleProjectsDirection}
          />
          Vertical
        </label>
        <label>
          <input
            type="radio"
            value="horizontal"
            checked={projectsDirection === "horizontal"}
            onChange={handleProjectsDirection}
          />
          Horizontal
        </label>
      </div>
    </>
  );
}
