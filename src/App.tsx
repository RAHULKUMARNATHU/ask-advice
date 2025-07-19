import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [adviceAskedCount, setadviceAskedCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAdvice() {
    setLoading(true);
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data?.slip?.advice);
      setadviceAskedCount((adviceAskedCount) => adviceAskedCount + 1);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="App">
      {loading ? <h1>Loading...</h1> : <h1>{advice}</h1>}
      <button onClick={getAdvice} disabled={loading}>
        Ask Advice
      </button>
      <Message adviceAskedCount={adviceAskedCount} />
    </div>
  );
}

function Message(props: Record<string, number>) {
  return <div>You have read {props?.adviceAskedCount} pieces of advice</div>;
}
