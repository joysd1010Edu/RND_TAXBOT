"use client";

import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
  FaFileAlt,
  FaGlobe,
} from "react-icons/fa";
import { AppendicesProps } from "@/Type/UserDashboard/ComplianceReport";

//========== Appendices Component ===========
const Appendices: React.FC<AppendicesProps> = ({
  contactInfo,
  documentationIndex,
  glossary,
  footer,
}) => {
  return (
    <div className="bg-gray-50 shadow-lg border border-gray-200 rounded-b-lg p-6 sm:p-8 space-y-6">
      {/*========= Section Title =========*/}
      <h2 className="text-lg font-semibold text-gray-900">
        Appendices & Supporting Information
      </h2>

      {/*========= Contact Information =========*/}
      <div className="">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Project Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-3 border-gray-200 border-2 rounded-xl">
          {/*========= Principal Investigator =========*/}
          <div className="space-y-3">
            <h4 className="textbase font-semibold text-gray-700">
              Principal Investigator
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base text-gray-700">
                <FaUser className="text-gray-400" size={14} />
                <span>{contactInfo.investigator.name}</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-700">
                <FaEnvelope className="text-gray-400" size={14} />
                <span>{contactInfo.investigator.email}</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-700">
                <FaPhone className="text-gray-400" size={14} />
                <span>{contactInfo.investigator.phone}</span>
              </div>
            </div>
          </div>

          {/*========= Company Information =========*/}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-700">
              Company Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base text-gray-700">
                <FaBuilding className="text-gray-400" size={14} />
                <span>{contactInfo.company.name}</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-700">
                <FaMapMarkerAlt className="text-gray-400" size={14} />
                <span>{contactInfo.company.address}</span>
              </div>
              <div className="flex items-center gap-2 text-base text-gray-700">
                <FaGlobe className="text-gray-400" size={14} />
                <span>{contactInfo.company.industry}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*========= Documentation Index =========*/}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Supporting Documentation Index
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-3 border-gray-200 border-2 rounded-lg">
          {documentationIndex.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-blue-600" size={20} />
                <div className="text-sm">
                  <p className=" text-base font-normal text-gray-700">
                    {doc.title}
                  </p>
                  <p className=" text-gray-500">{doc.pages} pages</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*========= Technical Glossary =========*/}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Technical Glossary
        </h3>
        <div className="space-y-3 bg-white p-3 md:p-6 border-gray-200 border-2 rounded-lg">
          {glossary.map((term) => (
            <div
              key={term.id}
              className="border-b border-gray-100 pb-3 last:border-0"
            >
              <p className="text-base font-normal text-gray-900 mb-1">
                {term.term}
              </p>
              <p className="text-sm text-gray-600">{term.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/*========= Footer =========*/}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-base text-gray-600 mb-4">
          <div>
            <p>
              <strong>Report ID:</strong> {footer.reportId}
            </p>
            <p>
              <strong>Generated:</strong> {footer.generatedDate}
            </p>
            <p>
              <strong>Version:</strong> {footer.version} final
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{footer.systemName}</p>
            <p>{footer.platform}</p>
            <p className="text-red-600 font-bold">{footer.confidential}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center">{footer.disclaimer}</p>
      </div>
    </div>
  );
};

export default Appendices;
