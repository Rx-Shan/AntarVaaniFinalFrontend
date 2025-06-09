import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SAMPLE_QUESTIONS = {
  "In the past two weeks, how often have you felt nervous, anxious, or on edge?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "How often have you felt down, depressed, or hopeless in the last two weeks?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "In the past two weeks, how often have you felt nervous, anxious, or on edge? (Duplicate)": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "How often have you felt down, depressed, or hopeless in the last two weeks? (Duplicate)": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "How would you rate the quality of your sleep in the past month?": [
    "Excellent", "Good", "Average", "Poor", "Very Poor"
  ],
  "How often do you feel tired or have little energy throughout the day?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "How frequently do you feel overwhelmed by your daily responsibilities or tasks?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "How often do you feel confident about yourself and your abilities?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "Do you find it hard to concentrate on tasks or remember things lately?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "How often do you spend time socializing or engaging in activities with friends or family?": [
    "Every day", "Several times a week", "Once a week", "Rarely", "Never"
  ],
  "How often do you feel lonely or isolated, even when surrounded by people?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "How often do you get easily irritated, frustrated, or angry?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "When you face a difficult situation, how confident are you in your ability to handle it?": [
    "Very confident", "Confident", "Neutral", "Not confident", "Very unconfident"
  ],
  "Have you noticed any significant changes in your eating habits in the last few weeks?": [
    "No change", "Eating less than usual", "Eating more than usual", "Loss of appetite"
  ],
  "How motivated do you feel to accomplish your daily tasks or long-term goals?": [
    "Very motivated", "Moderately motivated", "Neutral", "Low motivation", "No motivation"
  ],
  "How often do you experience negative thoughts about yourself or your future?": [
    "Never", "Rarely", "Sometimes", "Often", "Always"
  ],
  "Have you lost interest in activities you once enjoyed?": [
    "No", "Slightly", "Moderately", "Significantly", "Completely"
  ]
};

function QuestionnairePage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [userName, setUserName] = useState('');

  const handleChange = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSubmit = () => {
  console.log("Submitted answers:", answers);
  localStorage.setItem('mentalHealthAnswers', JSON.stringify(answers));
  localStorage.setItem('userName', userName);
  navigate('/chat');
};


  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-r from-sky-200 to-blue-100 flex flex-col items-center py-10 px-4 overflow-y-auto">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-6 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-center text-sky-900 mb-4">Mental Health Questionnaire</h2>

        <div className="mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Tell us your name..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        
        {Object.entries(SAMPLE_QUESTIONS).map(([question, options], index) => (
          <div key={index} className="bg-sky-300 bg-opacity-30 rounded-lg p-4 border-b-2 border-blue-200">
            <p className="font-semibold mb-2 text-black py-4">{index + 1}. {question}</p>
            <div className="flex flex-col space-y-1">
              {options.map((option, i) => (
                <label key={i} className="text-gray-800 flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[question] === option}
                    onChange={() => handleChange(question, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: '#3b82f6' }}
            className="bg-blue-500 shadow-xl text-white px-4 py-2 rounded transition-transform delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
          >
            Submit Questionnaire
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionnairePage;
