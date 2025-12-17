export interface ProjectCardProps {
  title: string;
  description: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  children?: React.ReactNode;
  actionButton?: React.ReactNode;
  headerAction?: React.ReactNode;
}