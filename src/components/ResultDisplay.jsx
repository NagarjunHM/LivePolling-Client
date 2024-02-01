import React from "react";

const ResultDisplay = ({ questions }) => {
  console.log(questions);
  return (
    <div>
      <div className="flex flex-col gap-4">
        {questions?.map((question, questionIndex) => (
          <div className="card card-body bg-base-300 " key={questionIndex}>
            <div className="text-2xl">
              <span className="mr-7">{questionIndex + 1}.</span>
              {question.question}
            </div>

            {/* looping through options */}
            {question.options.map((option, optionIndex) => (
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
                    value={0}
                    max="100"
                  ></progress>
                </div>
              </div>
            ))}
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
