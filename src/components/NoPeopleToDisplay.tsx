export function NoPeopleToDisplay() {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "#c9c9c9" }}>No people to display</h2>
    </div>
  );
}
