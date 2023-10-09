import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const increaseGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + total);
  };

  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(updatedNeutral + total);
  };
  const increaseBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(updatedBad + total);
  };

  const getAverage = () => {
    return (good - bad) / total;
  };
  const getPositivePercentage = () => {
    return (good / total) * 100;
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={getAverage() || 0}
        positive={getPositivePercentage() || 0}
      />
    </div>
  );
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <>
      <h2>statistics</h2>
      {total > 0 ? (
        <>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </>
      ) : null}
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
      {text === "positive" ? "%" : ""}
    </p>
  );
};

export default App;
