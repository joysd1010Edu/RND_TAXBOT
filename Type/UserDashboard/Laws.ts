export interface LawSubsection {
  id: string;
  title: string;
  icon?: string;
  iconColor?: string;
  content?: string | string[];
  examples?: string[];
  checkmarks?: string[];
  crossmarks?: string[];
}

export interface LawSection {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  subsections?: LawSubsection[];
  isExpanded?: boolean;
}

export interface OfficialResource {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
}

export interface LawsData {
  sections: LawSection[];
  officialResources: OfficialResource[];
}
