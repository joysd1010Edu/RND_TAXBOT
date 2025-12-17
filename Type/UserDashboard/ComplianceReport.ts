//========== Project Information Types ===========

export interface ProjectInfoData {
  projectName: string;
  principalInvestigator: string;
  industrySector: string;
  projectStatus: string;
  totalBudget: number;
  teamSize: number;
}

//========== Report Header Types ===========

export interface ReportHeaderData {
  projectTitle: string;
  companyName: string;
  complianceScore: number;
  reportDate: string;
  projectPeriod: string;
}

//========== Executive Summary Types ===========

export interface KeyHighlight {
  label: string;
  value: string;
}

export interface BusinessMetric {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

export interface ExecutiveSummaryData {
  projectTitle: string;
  companyName: string;
  projectPeriod: string;
  complianceScore: number;
  summaryText: string;
  keyHighlights: KeyHighlight[];
  businessMetrics: BusinessMetric[];
  complianceText: string;
}

//========== Compliance Score Types ===========

export interface CategoryScore {
  name: string;
  score: number;
  color: string;
}

//========== Innovation Metrics Types ===========

export interface InnovationMetric {
  subject: string;
  value: number;
  fullMark: number;
}

//========== Progress Charts Types ===========

export interface ProgressDataPoint {
  month: string;
  activitiesCompleted: number;
  complianceScore: number;
}

export interface ResourceDataPoint {
  month: string;
  budgetUtilization: number;
  rndHours: number;
}

//========== Financial Analysis Types ===========

export interface BudgetCard {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

export interface CostCategory {
  category: string;
  rndAmount: number;
  nonRndAmount: number;
  total: number;
  rndPercentage: number;
}

export interface ChartDataPoint {
  name: string;
  rndExpenditure: number;
  nonRndExpenditure: number;
}

//========== Team Composition Types ===========

export interface TeamMember {
  name: string;
  role: string;
  degree: string;
  specializations: string[];
  hours: number;
}

export interface TeamCompositionData {
  introText: string;
  teamMembers: TeamMember[];
  totalMembers: number;
  advancedDegrees: number;
  totalHours: number;
  rndFocusRate: number;
}




export interface ExecutiveSummaryProps {
  projectTitle: string;
  companyName: string;
  projectPeriod: string;
  complianceScore: number;
  summaryText: string;
  keyHighlights: KeyHighlight[];
  businessMetrics: BusinessMetric[];
  complianceText: string;
}

export interface FinancialAnalysisProps {
  budgetCards: BudgetCard[];
  costCategories: CostCategory[];
  chartData: {
    name: string;
    rndExpenditure: number;
    nonRndExpenditure: number;
  }[];
}
