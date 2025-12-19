"use client";

import React from "react";
import { MdPerson, MdAccessTime } from "react-icons/md";
import { FaGraduationCap, FaCode } from "react-icons/fa";
import { LuUser, LuUsers } from "react-icons/lu";

interface TeamMember {
  name: string;
  role: string;
  degree: string;
  specializations: string[];
  hours: number;
}

interface TeamCompositionProps {
  introText: string;
  teamMembers: TeamMember[];
  totalMembers: number;
  advancedDegrees: number;
  totalHours: number;
  rndFocusRate: number;
}

//========== Team Composition Component ===========
const TeamComposition: React.FC<TeamCompositionProps> = ({
  introText,
  teamMembers,
  totalMembers,
  advancedDegrees,
  totalHours,
  rndFocusRate,
}) => {
  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-2xl sm:text-3xl  text-gray-900">
        R&D Team Composition & Qualifications
      </h2>

      {/*========= Introduction =========*/}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
          {introText}
        </p>
      </div>

      {/*========= Team Members List =========*/}
      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            {/*========= Member Header =========*/}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <div>
                <div className=" flex items-center gap-3">
                  <LuUsers className="text-blue-600" size={24} />
                  <h3 className="text-lg font-normal text-gray-900">
                    {member.name}
                  </h3>
                </div>
                <p className="text-lg text-gray-500">{member.role}</p>
              </div>

              <div className="flex items-center gap-2 text-blue-600">
                <MdAccessTime size={20} />
                <span className="text-lg font-normal">{member.hours} hrs</span>
              </div>
            </div>

            {/*========= Member Details =========*/}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <FaGraduationCap size={20} className="text-purple-600" />
                <span>{member.degree}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaCode size={20} className="text-green-600" />
                <span>{member.specializations.join(", ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*========= Summary Statistics =========*/}

      <div className="grid grid-cols-1  md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl  text-blue-600 mb-2">
            {advancedDegrees}
          </div>
          <div className="text-sm text-gray-600">
            Advanced Degrees
            <br />
            <span className="text-xs text-gray-500">(PhDs/MSc)</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl  text-green-600 mb-2">
            {totalHours.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            Total R&D Hours
            <br />
            <span className="text-xs text-gray-500">Qualifying Time</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl  text-purple-600 mb-2">
            {rndFocusRate}%
          </div>
          <div className="text-sm text-gray-600">
            R&D Focus Rate
            <br />
            <span className="text-xs text-gray-500">Team Allocation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComposition;
