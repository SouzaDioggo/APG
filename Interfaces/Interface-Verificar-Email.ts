export interface VerifyEmailModalProps {
  email: string;
  isOpen: boolean;
  onVerify: (code: string) => Promise<void>;
}
