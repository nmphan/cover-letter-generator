import React from 'react'
import coverLettersData from '../Database/CoverLetters.json'

export default function PrevLetters() {
  const {coverLetters} = coverLettersData;

  return (
    <>
      {coverLetters.map((group) => {
        const firstCoverLetter = group.coverLetters[0];
        return (
          <div className="flex justify-center items-center m-10" key={firstCoverLetter.name}>
            <div className="w-full max-w-screen-2xl h-20 px-6 py-1 bg-white rounded-md border border-gray-300 flex justify-between items-center">
              <div>
                <span className="text-black text-xl font-semibold tracking-wide">Cover Letter - </span>
                <span className="text-black text-xl font-normal tracking-wide">{firstCoverLetter.name}</span>
              </div>
              <div className="w-32 px-4 py-2 border border-dotted border-black flex justify-center items-center">
                <div className="text-black text-sm font-medium">More</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
