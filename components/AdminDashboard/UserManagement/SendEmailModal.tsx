"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPanel,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

//========== Send Email Modal Props ==========
interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientEmail: string;
  onSend: (data: { subject: string; body: string }) => Promise<void>;
  isSending?: boolean;
}

//========== Send Email Modal Component ==========
const SendEmailModal: React.FC<SendEmailModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  recipientEmail,
  onSend,
  isSending = false,
}) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; body?: string }>({});

  //========== Clear form when modal closes ==========
  useEffect(() => {
    if (!isOpen && !isSending) {
      setSubject("");
      setBody("");
      setErrors({});
    }
  }, [isOpen, isSending]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { subject?: string; body?: string } = {};
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!body.trim()) newErrors.body = "Message body is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      await onSend({ subject: subject.trim(), body: body.trim() });
    } catch (error) {
      // Error is handled by parent, form stays open for retry
    }
  };

  const handleClose = () => {
    setSubject("");
    setBody("");
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
          <DialogDescription>
            Send an email to {recipientName} ({recipientEmail})
          </DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/*========== Subject Field ==========*/}
            <div className="space-y-2">
              <Label htmlFor="email-subject">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email-subject"
                type="text"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject)
                    setErrors((prev) => ({ ...prev, subject: undefined }));
                }}
                aria-invalid={errors.subject ? "true" : "false"}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/*========== Body Field ==========*/}
            <div className="space-y-2">
              <Label htmlFor="email-body">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="email-body"
                placeholder="Write your message here..."
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                  if (errors.body)
                    setErrors((prev) => ({ ...prev, body: undefined }));
                }}
                rows={6}
                aria-invalid={errors.body ? "true" : "false"}
              />
              {errors.body && (
                <p className="text-sm text-red-500">{errors.body}</p>
              )}
            </div>

            {/*========== Form Actions ==========*/}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
};

export default SendEmailModal;
