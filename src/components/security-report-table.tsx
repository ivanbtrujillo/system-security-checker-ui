import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SecurityReport } from "@/types/security-report";

const getStatusColor = (value: boolean | number | null, type: string) => {
  if (type === "screenLock") {
    if (value === null || value === false) return "bg-[rgb(255,99,132)]";
    if (typeof value === "number") {
      if (value <= 20) return "bg-[rgb(75,192,192)]";
      return "bg-orange-500";
    }
  }
  return value ? "bg-[rgb(75,192,192)]" : "bg-[rgb(255,99,132)]";
};

const getReportStatusColor = (report: SecurityReport) => {
  const { antivirus_detected, disk_encrypted, screen_lock_active } = report;

  if (antivirus_detected && disk_encrypted && screen_lock_active) {
    return "bg-[rgb(75,192,192)]";
  }
  if (antivirus_detected || disk_encrypted || screen_lock_active) {
    return "bg-orange-500";
  }
  return "bg-[rgb(255,99,132)]";
};

const isOlderThanWeek = (date: string) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return new Date(date) < oneWeekAgo;
};

interface SecurityReportTableProps {
  reports: SecurityReport[];
}

export const SecurityReportTable: React.FC<SecurityReportTableProps> = ({
  reports,
}) => {
  return (
    <div className="w-full max-h-[50vh] overflow-auto">
      <Table className="text-white">
        <TableHeader className="bg-zinc-700">
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Operating System</TableHead>
            <TableHead className="text-gray-300">OS version</TableHead>
            <TableHead className="text-gray-300">Disk encrypted</TableHead>
            <TableHead className="text-gray-300">Encryption type</TableHead>
            <TableHead className="text-gray-300">Antivirus</TableHead>
            <TableHead className="text-gray-300">Antivirus name</TableHead>
            <TableHead className="text-gray-300">Screen lock</TableHead>
            <TableHead className="text-gray-300">Screen lock time</TableHead>
            <TableHead className="text-gray-300">Last check</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id} className="border-b border-gray-700">
              <TableCell className={getReportStatusColor(report)}>
                {report.email}
              </TableCell>
              <TableCell>{report.operating_system}</TableCell>
              <TableCell>{report.os_version}</TableCell>
              <TableCell
                className={getStatusColor(report.disk_encrypted, "disk")}
              >
                {report.disk_encrypted ? "Yes" : "No"}
              </TableCell>
              <TableCell>{report.encryption_type || "N/A"}</TableCell>
              <TableCell
                className={getStatusColor(
                  report.antivirus_detected,
                  "antivirus"
                )}
              >
                {report.antivirus_detected ? "Protected" : "Not Protected"}
              </TableCell>
              <TableCell>{report.antivirus_name || "N/A"}</TableCell>
              <TableCell
                className={getStatusColor(
                  report.screen_lock_active,
                  "screenLock"
                )}
              >
                {report.screen_lock_active ? "Enabled" : "Disabled"}
              </TableCell>
              <TableCell
                className={getStatusColor(
                  report.screen_lock_time,
                  "screenLock"
                )}
              >
                {`${report.screen_lock_time} min` || "N/A"}
              </TableCell>
              <TableCell
                className={
                  isOlderThanWeek(report.last_check) ? "bg-orange-200" : ""
                }
              >
                {new Date(report.last_check).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
