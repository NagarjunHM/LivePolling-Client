import React from "react";

const ResultDisplay = ({ questions }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {questions?.map((question, questionIndex) => (
          <div className="border shadow card card-body " key={questionIndex}>
            <div className="text-2xl">
              <span className="mr-7">{questionIndex + 1}.</span>
              {question.question}
            </div>

            {/* looping through options */}
            {question.options.map((option, optionIndex) => {
              const votes =
                question.votes && question.votes[optionIndex]
                  ? question.votes[optionIndex]
                  : 0;
              const totalVotes = question.userAnswer.length;
              const percentage =
                totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

              return (
                <div key={optionIndex} className="items-start card-actions ">
                  <div className="w-screen">
                    <div className="form-control">
                      <label className="flex gap-4 cursor-pointer label">
                        <input
                          type="radio"
                          name={questionIndex}
                          className="radio"
                        />
                        <span className="text-xl label-text">{option}</span>
                      </label>
                    </div>
                    <progress
                      className="w-full progress"
                      value={percentage}
                      max="100"
                    ></progress>
                    <div className="mt-1 text-xs text-center">
                      {percentage.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div className="fixed flex px-4 bg-blue-500 btm-nav backdrop-blur">
          <div className="items-end ">
            <button className=" btn btn-warning">send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
