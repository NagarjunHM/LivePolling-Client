import React from "react";

import { IoClose, IoAddOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";

import usePollSlice from "../store/poll/usePollSlice.js";

const NewPollCreation = () => {
  const {
    questions,
    handleQuestionInput,
    handleOptions,
    handleAddOption,
    handleDeleteOption,
    handleQuestionDelete,
    handleQuestionAdd,
    handleForm,
  } = usePollSlice();

  return (
    <div>
      <form onSubmit={handleForm}>
        {questions.map((question, questionIndex) => (
          <React.Fragment key={questionIndex}>
            <div className="my-4 shadow bg-base-200 card card-body ">
              {/* card close button */}
              <div className="justify-end card-actions">
                <div
                  className="tooltip tooltip-left"
                  data-tip="close this question"
                >
                  <button
                    className="btn btn-square"
                    onClick={() => {
                      handleQuestionDelete(questionIndex);
                    }}
                  >
                    <IoClose size="2em" />
                  </button>
                </div>
              </div>

              {/* question */}
              <div className="label">
                <span className="label-text">Enter question</span>
              </div>
              <textarea
                className="h-24 text-xl textarea textarea-bordered"
                placeholder="Question"
                value={question.question}
                onChange={(e) => {
                  handleQuestionInput(e.target.value, questionIndex);
                }}
              ></textarea>

              {/* options */}
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Type here"
                    value={option}
                    onChange={(e) =>
                      handleOptions(e.target.value, optionIndex, questionIndex)
                    }
                    className="w-full max-w-xs input input-bordered"
                  />

                  {optionIndex !== 0 ? (
                    <button
                      onClick={() =>
                        handleDeleteOption(questionIndex, optionIndex)
                      }
                    >
                      <RiDeleteBin7Line size="1.5em" className="text-red-500" />
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              ))}

              {/* add option button */}
              <div>
                <div
                  className="tooltip tooltip-right"
                  data-tip="add new option"
                >
                  <button
                    className="btn btn-circle "
                    onClick={() => handleAddOption(questionIndex)}
                  >
                    <IoAddOutline size="2em" />
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* button to add new question */}
        <div className="flex justify-end">
          <button className="btn btn-neutral " onClick={handleQuestionAdd}>
            Add question
          </button>
        </div>

        {/* submit button */}
        <div className="fixed flex px-4 btm-nav backdrop-blur bg-base-300">
          <div className="items-end ">
            <button className=" btn btn-warning" type="submit">
              send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPollCreation;
