import { useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickFeedback = (e) => {
    const option = e.target.textContent;
    
    switch (option) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  }
    
  const countPositiveFeedbackPercentage  = () => {
    return Math.round(good / (good + neutral + bad) * 100);
  }

  return (
    <div className='container'>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions 
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={handleClickFeedback}
        />
      </Section>
      <Section title="Statistics">
          { countTotalFeedback() ?
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
            : 
            <Notification message="There is no feedback" />
          }
      </Section>        
    </div>
  );
  
}
