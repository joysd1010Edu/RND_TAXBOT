import { LawsData } from "@/Type/UserDashboard/Laws";

export const lawsData: LawsData = {
  sections: [
    {
      id: "overview",
      title: "R&D Tax Incentive Overview",
      description:
        "The R&D Tax Incentive is a targeted, generous tax offset for companies conducting eligible research and development activities. It encourages companies to conduct R&D benefiting Australia, resulting in new knowledge and improving the broader economy.",
      subsections: [
        {
          id: "tax-offset-rates",
          title: "Tax Offset Rates (2024-25)",
          icon: "calculator",
          iconColor: "text-blue-600 dark:text-blue-400",
          content:
            "Current tax offset rates for eligible R&D expenditure under the R&D Tax Incentive program.",
        },
        {
          id: "basic-eligibility",
          title: "Basic Eligibility",
          icon: "check-circle",
          iconColor: "text-green-600 dark:text-green-400",
          content:
            "Requirements that companies must meet to be eligible for the R&D Tax Incentive.",
        },
      ],
    },
    {
      id: "core-activities",
      title: "Core R&D Activities",
      description:
        "Core R&D activities are experimental activities conducted for the purpose of generating new knowledge.",
      subsections: [
        {
          id: "definition",
          title: "Definition (Section 355-25 ITAA 1997)",
          icon: "book-open",
          iconColor: "text-indigo-600 dark:text-indigo-400",
          content:
            "An activity is a core R&D activity if:\n\n(a) It is conducted for the purpose of generating new knowledge (including new knowledge in the form of new or improved materials, products, devices, processes or services); and\n\n(b) The outcome cannot be known or determined in advance on the basis of current knowledge, information or experience, but can only be determined by applying a systematic progression of work that:\n(i) is based on principles of established science; and\n(ii) proceeds from hypothesis to experiment, observation and evaluation, and leads to logical conclusions; and\n\n(c) is conducted for the purpose of the experiment.",
        },
        {
          id: "examples",
          title: "Examples of Core Activities",
          icon: "lightbulb",
          iconColor: "text-yellow-600 dark:text-yellow-400",
          checkmarks: [
            "Developing new algorithms with uncertain outcomes",
            "Testing new manufacturing processes with unknown efficiency",
            "Creating new materials with uncertain properties",
            "Experimental testing to resolve technical uncertainty",
            "Systematic investigation of scientific hypotheses",
          ],
          crossmarks: [
            "Routine data collection",
            "Quality control testing",
            "Market research",
            "Cosmetic modifications",
            "Implementing existing technology in a new context",
          ],
        },
        {
          id: "hypothesis",
          title: "Hypothesis Requirement",
          icon: "flask",
          iconColor: "text-purple-600 dark:text-purple-400",
          content:
            'A clear hypothesis is crucial:\n\n• Must be formulated before experimental work begins\n• Should address specific technical uncertainty\n• Must be testable through systematic experimentation\n• Should aim to generate new knowledge\n\nExample: "We hypothesized that using graphene-enhanced polymers would increase tensile strength by 40% while reducing weight by 25%, though this combination had never been achieved in existing materials science."',
        },
      ],
    },
    {
      id: "supporting-activities",
      title: "Supporting R&D Activities",
      description:
        "Activities directly related to core R&D activities that are undertaken for a purpose directly related to the core activities.",
      subsections: [
        {
          id: "definition-supporting",
          title: "Definition (Section 355-30 ITAA 1997)",
          icon: "layers",
          iconColor: "text-teal-600 dark:text-teal-400",
          content:
            "Activities directly related to core R&D activities that are undertaken for a purpose directly related to the core activities.",
        },
        {
          id: "examples-supporting",
          title: "Examples of Supporting Activities",
          icon: "list",
          iconColor: "text-cyan-600 dark:text-cyan-400",
          checkmarks: [
            "Preparing materials for experimental testing",
            "Operating pilot plants for R&D purposes",
            "Analyzing experimental results",
            "Modifying equipment for R&D experiments",
            "Literature reviews informing R&D hypothesis",
          ],
        },
      ],
    },
    {
      id: "eligible-expenditure",
      title: "Eligible Expenditure",
      description:
        "Expenditure that can be claimed under the R&D Tax Incentive",
      subsections: [
        {
          id: "staff-costs",
          title: "Staff Costs",
          icon: "users",
          iconColor: "text-pink-600 dark:text-pink-400",
          content:
            "Salaries and wages for employees directly engaged in R&D activities, including superannuation and payroll tax.",
        },
        {
          id: "contractor-costs",
          title: "Contractor Costs",
          icon: "briefcase",
          iconColor: "text-orange-600 dark:text-orange-400",
          content:
            "Payments to contractors conducting R&D activities on your behalf (limited to 2/3 of expenditure).",
        },
        {
          id: "other-deductible",
          title: "Other Deductible Expenditure",
          icon: "receipt",
          iconColor: "text-emerald-600 dark:text-emerald-400",
          content:
            "Materials consumed, energy costs, equipment depreciation, and other expenses directly related to R&D activities.",
        },
      ],
    },
    {
      id: "compliance-documentation",
      title: "Compliance & Documentation",
      description: "Requirements for claiming the R&D Tax Incentive",
      subsections: [
        {
          id: "registration-requirements",
          title: "Registration Requirements",
          icon: "file-text",
          iconColor: "text-blue-600 dark:text-blue-400",
          content:
            "Companies must register their R&D activities with AusIndustry within 10 months of the end of the income year.",
        },
        {
          id: "record-keeping",
          title: "Record Keeping",
          icon: "archive",
          iconColor: "text-amber-600 dark:text-amber-400",
          content:
            "Maintain detailed records of R&D activities, expenditure, and technical documentation for at least 5 years.",
        },
        {
          id: "advance-overseas-findings",
          title: "Advance and Overseas Findings",
          icon: "globe",
          iconColor: "text-sky-600 dark:text-sky-400",
          content:
            "Consider obtaining advance findings for complex activities and approval for overseas R&D activities.",
        },
      ],
    },
    {
      id: "excluded-activities",
      title: "Excluded Activities",
      description: "Activities that do NOT qualify for the R&D Tax Incentive",
      subsections: [
        {
          id: "common-exclusions",
          title: "Common Exclusions (Section 355-25)",
          icon: "x-circle",
          iconColor: "text-red-600 dark:text-red-400",
          crossmarks: [
            "Market research or consumer surveys",
            "Quality control or routine testing",
            "Management studies or efficiency surveys",
            "Research in social sciences, arts or humanities",
            "Prospecting, exploring or drilling for minerals or petroleum",
            "Pre-production activities such as tooling-up",
            "Routine data collection and analysis",
            "Commercial reproduction of products",
            "Implementing existing technology without technical uncertainty",
          ],
        },
      ],
    },
    {
      id: "legal-references",
      title: "Legal References & Resources",
      description: "Official legislation and guidance documents",
      subsections: [
        {
          id: "key-legislation",
          title: "Key Legislation",
          icon: "book",
          iconColor: "text-slate-600 dark:text-slate-400",
          content: [
            "Income Tax Assessment Act 1997 - Division 355",
            "Industry Research and Development Act 1986",
            "Income Tax Assessment Regulations 2020",
          ],
        },
      ],
    },
  ],
  officialResources: [
    {
      id: "ato-guide",
      title: "ATO - R&D Tax Incentive",
      description: "Official guidance from the Australian Taxation Office",
      url: "https://www.ato.gov.au/business/research-and-development-tax-incentive/",
      icon: "external-link",
    },
    {
      id: "business-gov",
      title: "business.gov.au - R&D Tax Incentive",
      description: "Program overview and registration information",
      url: "https://business.gov.au/grants-and-programs/research-and-development-tax-incentive",
      icon: "external-link",
    },
    {
      id: "itaa-1997",
      title: "Income Tax Assessment Act 1997 - Division 355",
      description: "Official legislation text",
      url: "https://www.legislation.gov.au/Series/C2004A01367",
      icon: "external-link",
    },
  ],
};
