import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const increaseGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(total + 1);
  };

  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(total + 1);
  };
  const increaseBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(total + 1);
  };

  const getAverage = () => {
    return Math.round(((good - bad) / total) * 100) / 100;
  };
  const getPositivePercentage = () => {
    return Math.round((good / total) * 100) / 100;
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
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      ) : null}
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};

export default App;
