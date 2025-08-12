export default function Grid({ data, getColor }) {
  const rows = data.length;
  const cols = data[0]?.length || 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        width: "100%",
        maxWidth: "200px", // limit total size
        aspectRatio: `${cols} / ${rows}`, // ensures cells are perfect squares
        border: "1px solid #ccc",
      }}
    >
      {data.map((row, r) =>
        row.map((value, c) => (
          <div
            key={`${r}-${c}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ddd",
              backgroundColor: getColor ? getColor(value) : "#fff",
              fontSize: "0.9rem",
              fontFamily: "monospace",
            }}
          >
            {value}
          </div>
        ))
      )}
    </div>
  );
}
