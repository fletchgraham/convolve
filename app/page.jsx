import Grid from "../components/grid";

export default function Page() {
  // render test grid
  const testData = [
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
  ];
  return <Grid data={testData} />;
}
