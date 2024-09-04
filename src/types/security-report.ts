export interface SecurityReport {
  id: number;
  email: string;
  disk_encrypted: boolean;
  encryption_type: string | null;
  antivirus_detected: boolean;
  antivirus_name: string | null;
  screen_lock_active: boolean;
  screen_lock_time: number | null;
  last_check: string;
}
