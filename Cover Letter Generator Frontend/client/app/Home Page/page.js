import React from 'react'
import Header from '../components/Header'
import { FaDownload } from "react-icons/fa";
import Dropzone from '../UploadingDrawing/dropzone';

export default function Main() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[1369px] h-[790px] relative rounded-[10px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] border bg-white">
          <div className="w-[617px] h-[540px] left-10 top-[146px] absolute bg-[#d3d3d3]/50 rounded-lg overflow-hidden">
            <div className="w-[617px] pl-7 pr-[485px] py-6 absolute border-b border-black justify-start items-center inline-flex overflow-hidden">
              <div className="text-black/80 text-2xl font-bold font-['Inter'] tracking-wide">Resume</div>
            </div>
            <textarea
              className="top-20 absolute w-[100%] h-[500px] p-6 text-black/80 text-2xl font-normal font-['Inter'] rounded-md bg-[#d3d3d3]/50 focus:outline-none border border-transparent transition-all duration-300"
              placeholder="Paste resume text..."
            />
            <Dropzone />
          </div>
          <div className="w-[617px] h-[540px] left-[720px] top-[146px] absolute bg-[#d3d3d3]/50 rounded-lg overflow-hidden">
            <div className="w-[617px] pl-9 pr-[375px] py-6 left-0 top-0 absolute border-b border-black justify-start items-center inline-flex overflow-hidden">
              <div className="text-black text-2xl font-bold font-['Inter'] tracking-wide">Job description</div>
            </div>
            <textarea
              className="top-20 absolute w-[100%] h-[500px] p-6 text-black/80 text-2xl font-normal font-['Inter'] rounded-md bg-[#d3d3d3]/50 focus:outline-none border border-transparent transition-all duration-300"
              placeholder="Paste job description text..."
            />
          </div>
          <div className="left-10 top-10 absolute">
            <span className="text-black text-5xl font-extrabold font-['Inter'] tracking-wider">Cover</span>
            <span className="text-black text-4xl font-bold font-['Inter'] tracking-wider">Craft</span>
          </div>
          <div className="w-auto h-16 pl-8 pr-9 py-3.5 left-[1102px] bottom-5 absolute bg-black rounded-xl border border-black justify-end items-center inline-flex overflow-hidden">
            <div className="text-white/80 text-2xl font-black font-['Inter'] tracking-wide hover:text-white cursor-pointer">Generate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
