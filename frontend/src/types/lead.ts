export interface LeadFormData {
  auditId: string;
  email: string;
  company?: string;
  role?: string;
  teamSize?: number;
  website?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
}
