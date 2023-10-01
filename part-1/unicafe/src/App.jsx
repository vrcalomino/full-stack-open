import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Statistics = (props) => {
  return (
    <div>
      <StatisticLine
        text="good"
        value={props.good}
      />
      <StatisticLine
        text="neutral"
        value={props.neutral}
      />
      <StatisticLine
        text="bad"
        value={props.bad}
      />
      <StatisticLine
        text="all"
        value={props.all}
      />
      <StatisticLine
        text="average"
        value={props.average}
      />
      <StatisticLine
        text="positive"
        value={props.positivePercentage}
      />
      {/* <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positivePercentage}%</p> */}
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = bad + neutral + good;

  // Calculate average score
  const average = all > 0 ? (good - bad) / all : 0;

  // Calculate percentage of positive feedback
  const positivePercentage = all > 0 ? (good / all) * 100 : 0;
  return (
    <div>
      <h2>give feedback</h2>
      <Button
        text="good"
        onClick={() => setGood(good + 1)}
      />
      <Button
        text="neutral"
        onClick={() => setNeutral(neutral + 1)}
      />
      <Button
        text="bad"
        onClick={() => setBad(bad + 1)}
      />
      <h2>statistics</h2>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          average={average}
          positivePercentage={positivePercentage}
        />
      )}
    </div>
  );
};

export default App;
