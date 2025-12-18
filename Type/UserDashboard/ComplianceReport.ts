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

//========== Core R&D Activities Types ===========

export interface ResearchObjective {
  text: string;
}

export interface TechnicalChallenge {
  text: string;
}

export interface ResearchApproach {
  text: string;
}

export interface Innovation {
  text: string;
}

export interface Outcome {
  text: string;
}

export interface ActivityDocument {
  name: string;
  id: string;
}

export interface CoreActivity {
  id: string;
  activityNumber: number;
  totalActivities: number;
  title: string;
  status: string;
  duration: string;
  budget: string;
  complianceScore: number;
  description: string;
  researchObjectives: ResearchObjective[];
  technicalChallenges: TechnicalChallenge[];
  researchApproach: ResearchApproach[];
  innovations: Innovation[];
  outcomes: Outcome[];
  complianceFindings: string;
  complianceRecommendations: string;
  documents: ActivityDocument[];
}

export interface CoreActivitiesProps {
  activities: CoreActivity[];
}

//========== Supporting R&D Activities Types ===========

export interface KeyActivity {
  text: string;
}

export interface SupportingActivity {
  id: string;
  title: string;
  duration: string;
  budget: string;
  status: string;
  complianceScore: number;
  description: string;
  keyActivities: KeyActivity[];
  rndNexus: string;
  complianceFinding: string;
}

export interface SupportingActivitiesProps {
  introduction: string;
  activities: SupportingActivity[];
}

//========== Technology Stack Types ===========

export interface TechnologyCategory {
  id: string;
  name: string;
  technologies: string;
  purpose: string;
  innovation: string;
}

export interface TechnologyStackProps {
  categories: TechnologyCategory[];
  architectureDiagramNote: string;
}

//========== Project Milestones Types ===========

export interface Milestone {
  id: string;
  phase: string;
  startDate: string;
  budget: string;
  complianceScore: string;
  deliverables: string[];
}

export interface ProjectMilestonesProps {
  milestones: Milestone[];
}

//========== Risk Assessment Types ===========

export interface Risk {
  id: string;
  title: string;
  probability: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High" | "Critical";
  mitigation: string;
  status: "Mitigated" | "Resolved" | "Controlled";
}

export interface QualityMetric {
  id: string;
  name: string;
  target: string;
  achieved: string;
  status: "Exceeded" | "Met";
}

export interface RiskAssessmentProps {
  introduction: string;
  risks: Risk[];
  qualityMetrics: QualityMetric[];
}

//========== Intellectual Property Types ===========

export interface IPItem {
  id: string;
  type: "Patent Application" | "Trade Secret" | "Open Source";
  status: "Filed" | "Protected" | "Published";
  title: string;
  reference: string;
  date: string;
}

export interface IPStatistic {
  value: string;
  label: string;
}

export interface IntellectualPropertyProps {
  introduction: string;
  items: IPItem[];
  statistics: IPStatistic[];
}

//========== Conclusion Types ===========

export interface KeyFinding {
  id: string;
  title: string;
  description: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
}

export interface ConclusionProps {
  overallScore: string;
  projectTitle: string;
  summaryText: string;
  keyFindings: KeyFinding[];
  recommendations: Recommendation[];
  complianceStatement: string;
  reportDetails: {
    auditor: string;
    auditDate: string;
    reportId: string;
    status: string;
  };
}

//========== Appendices Types ===========

export interface DocumentIndex {
  id: string;
  title: string;
  pages:number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

export interface AppendicesProps {
  contactInfo: {
    investigator: {
      name: string;
      email: string;
      phone: string;
    };
    company: {
      name: string;
      address: string;
      industry: string;
    };
  };
  documentationIndex: DocumentIndex[];
  glossary: GlossaryTerm[];
  footer: {
    reportId: string;
    generatedDate: string;
    version: string;
    systemName: string;
    platform: string;
    confidential: string;
    disclaimer: string;
  };
}
