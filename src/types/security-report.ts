export interface SecurityReport {
  user_id: string;
  device_id: string;
  email: string;
  disk_encrypted: boolean;
  encryption_type: string | null;
  antivirus_detected: boolean;
  antivirus_name: string | null;
  screen_lock_active: boolean;
  screen_lock_time: number | null;
  operating_system: string | null;
  os_version: string | null;
  last_check: string;
}
