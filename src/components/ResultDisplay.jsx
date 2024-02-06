import React from "react";

const ResultDisplay = ({ questions }) => {
  return (
    <div className="">
      <div className="w-full">
        {questions?.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="mb-4 border shadow bg-violet-100/50 card card-body card-compact"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 mb-4 text-xl font-bold flex-0">
                {questionIndex + 1}. {question.question}
              </div>
              <div className="mt-1.5 font-light badge badge-neutral ">
                Total Votes : {question.userAnswer.length}
              </div>
            </div>

            {/* Looping through options */}
            {question.options.map((option, optionIndex) => {
              const votes =
                question.votes && question.votes[optionIndex]
                  ? question.votes[optionIndex]
                  : 0;
              const totalVotes = question.userAnswer.length;
              const percentage =
                totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

              return (
                <div
                  key={optionIndex}
                  className={` p-1.5 rounded ${
                    optionIndex === question.correctAnswerIndex
                      ? "bg-green-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">{option}</span>
                    <span className="text-sm font-semibold">
                      Votes: {votes} | Per: {percentage.toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-info"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;
