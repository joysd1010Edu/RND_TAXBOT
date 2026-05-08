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
          checkmarks: [
            "Refundable offset: 18.5% premium above company tax rate (43.5% for companies with turnover < $20m)",
            "Non-refundable offset: 8.5% premium above company tax rate (38.5% for companies with turnover ≥ $20m)",
            "R&D expenditure threshold: Minimum $20,000 per year",
            "Automatic access for companies with aggregated turnover < $20 million",
            "Intensity-based approach for companies with turnover ≥ $20 million",
          ],
          examples: [
            "Small company ($15m turnover) spends $500k on R&D: Receives $217,500 refundable offset",
            "Large company ($50m turnover) with 5% R&D intensity: Receives non-refundable offset at base rate",
          ],
        },
        {
          id: "basic-eligibility",
          title: "Basic Eligibility",
          icon: "check-circle",
          iconColor: "text-green-600 dark:text-green-400",
          content:
            "Requirements that companies must meet to be eligible for the R&D Tax Incentive.",
          checkmarks: [
            "Company must be incorporated under Australian law or foreign company with Australian permanent establishment",
            "Must conduct eligible R&D activities in Australia (or approved overseas activities)",
            "Minimum $20,000 expenditure on eligible R&D activities in the income year",
            "Must register R&D activities with AusIndustry within 10 months of year end",
            "Activities must meet the definition of core or supporting R&D activities",
            "Must maintain detailed records and documentation of R&D activities",
            "Cannot claim for activities conducted on behalf of others (with some exceptions)",
          ],
          crossmarks: [
            "Sole traders and partnerships (must be a company structure)",
            "Activities conducted primarily outside Australia without approval",
            "Expenditure below $20,000 threshold",
            "Activities that don't meet technical uncertainty requirements",
          ],
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
          checkmarks: [
            "Salary and wages for employees conducting or directly supporting R&D",
            "Superannuation contributions and employer obligations",
            "Payroll tax and workers compensation insurance",
            "Bonuses and allowances paid to R&D staff",
            "Leave entitlements (annual leave, sick leave) for R&D employees",
            "Must maintain detailed time tracking or reasonable allocation methods",
          ],
          examples: [
            "Software developer spending 60% of time on eligible R&D activities can claim 60% of salary costs",
            "Project manager overseeing R&D team - allocation based on documented time records",
            "Lab technician conducting R&D experiments - 100% of salary if fully dedicated to R&D",
          ],
        },
        {
          id: "contractor-costs",
          title: "Contractor Costs",
          icon: "briefcase",
          iconColor: "text-orange-600 dark:text-orange-400",
          content:
            "Payments to contractors conducting R&D activities on your behalf (limited to 2/3 of expenditure).",
          checkmarks: [
            "Only 2/3 (66.67%) of contractor payments are eligible for R&D claim",
            "Contractor must be engaged to conduct R&D activities on your behalf",
            "Written agreements should clearly specify R&D scope of work",
            "RSP (Research Service Provider) may allow contractors to claim full amount",
            "Must maintain invoices, contracts, and activity records",
            "Contractor cannot claim the same expenditure themselves",
          ],
          crossmarks: [
            "Cannot claim 100% of contractor costs unless through RSP",
            "Consultants providing advice only (not conducting R&D)",
            "Overseas contractors without proper documentation",
            "Related party contractors at non-arm's length rates",
          ],
          examples: [
            "Pay contractor $30,000 for R&D software development: Claim $20,000 (2/3 of payment)",
            "Engage RSP contractor: May claim different rates - check RSP agreements",
          ],
        },
        {
          id: "other-deductible",
          title: "Other Deductible Expenditure",
          icon: "receipt",
          iconColor: "text-emerald-600 dark:text-emerald-400",
          content:
            "Materials consumed, energy costs, equipment depreciation, and other expenses directly related to R&D activities.",
          checkmarks: [
            "Consumables: Raw materials, chemicals, samples directly used in R&D",
            "Energy costs: Electricity, gas, water consumed during R&D activities",
            "Depreciation: Decline in value of equipment used for R&D purposes",
            "Software licenses and subscriptions used exclusively for R&D",
            "Maintenance costs for R&D equipment and facilities",
            "Research Service Provider (RSP) fees at marked-up rates",
            "Travel expenses directly related to R&D activities",
            "Patent and IP costs related to R&D outcomes",
          ],
          crossmarks: [
            "General overhead costs (rent, utilities for entire office)",
            "Administrative and management costs not directly related to R&D",
            "Marketing and sales expenses",
            "Capital expenditure on buildings and land",
            "Interest expenses and financing costs",
          ],
          examples: [
            "Chemical reagents consumed in lab experiments: Fully claimable",
            "Cloud computing costs for R&D simulations: Claimable based on usage",
            "Equipment depreciation: Calculate based on effective life and R&D usage percentage",
          ],
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
          checkmarks: [
            "Register with AusIndustry within 10 months after end of income year",
            "Use business.gov.au online portal for registration",
            "Provide detailed description of core R&D activities",
            "Declare estimated eligible expenditure",
            "Extension requests must be submitted before deadline with valid reasons",
            "Late registration may result in loss of R&D tax offset",
            "Must lodge tax return claiming R&D offset after registration approval",
          ],
          crossmarks: [
            "Missing the 10-month deadline without approved extension",
            "Incomplete or inadequate activity descriptions",
            "Failing to register before lodging tax return",
            "Not updating registration if activities change significantly",
          ],
          examples: [
            "Company with 30 June year-end: Must register by 30 April the following year",
            "Approved extension: May receive additional 3 months in exceptional circumstances",
          ],
        },
        {
          id: "record-keeping",
          title: "Record Keeping",
          icon: "archive",
          iconColor: "text-amber-600 dark:text-amber-400",
          content:
            "Maintain detailed records of R&D activities, expenditure, and technical documentation for at least 5 years.",
          checkmarks: [
            "Keep records for 5 years from the date of lodging R&D tax return",
            "Document the nature and objectives of each R&D project",
            "Maintain technical specifications, hypothesis, and methodology",
            "Record progression of work, experiments, and results",
            "Track time spent by employees on R&D activities (timesheets, project logs)",
            "Keep financial records: invoices, payroll, contractor agreements",
            "Document decision-making process and technical challenges",
            "Maintain meeting minutes, technical reports, and project plans",
            "Store lab notebooks, test results, and experimental data",
            "Keep correspondence with R&D advisors and technical experts",
          ],
          examples: [
            "Lab notebook detailing daily experiments, observations, and outcomes",
            "Project management software tracking R&D tasks and time allocation",
            "Technical documentation: design specifications, test protocols, analysis reports",
            "Financial records: segregated cost centers for R&D projects",
          ],
        },
        {
          id: "advance-overseas-findings",
          title: "Advance and Overseas Findings",
          icon: "globe",
          iconColor: "text-sky-600 dark:text-sky-400",
          content:
            "Consider obtaining advance findings for complex activities and approval for overseas R&D activities.",
          checkmarks: [
            "Advance Finding: Get AusIndustry's opinion before conducting activities",
            "Provides certainty about whether activities qualify as R&D",
            "Recommended for novel, complex, or high-value R&D projects",
            "Application fee applies (varies by company size)",
            "Overseas Finding: Required for R&D conducted outside Australia",
            "Must demonstrate activities cannot be conducted in Australia",
            "Apply before starting overseas R&D activities",
            "Limited to activities that cannot reasonably be done in Australia",
          ],
          examples: [
            "Novel software algorithm development: Consider Advance Finding for certainty",
            "Clinical trials requiring specific overseas facilities: Apply for Overseas Finding",
            "Testing in extreme climates not available in Australia: Eligible for overseas approval",
          ],
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
