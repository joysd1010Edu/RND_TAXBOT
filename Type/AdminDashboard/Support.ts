export interface SupportMessage {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  priority: "high" | "medium" | "low";
  description: string;
  status: "open" | "in-review" | "resolved";
  timestamp: string;
  project: string;
  message: string;
  attachments?: Attachment[];
  internalNotes?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url?: string;
}

export interface MessageListItemProps {
  message: SupportMessage;
  isSelected: boolean;
  onClick: () => void;
}

export interface MessageDetailProps {
  message: SupportMessage;
  onSaveNotes: (notes: string) => void;
  onSendReply: (reply: string) => void;
  onMarkResolved: () => void;
  onDownloadAttachment: (attachment: Attachment) => void;
}
