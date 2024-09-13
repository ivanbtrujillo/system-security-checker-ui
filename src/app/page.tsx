"use client";

import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {SecurityReport} from "@/types/security-report";
import {SecurityReportTable} from "@/components/security-report-table";
import {SecurityStatsChart} from "@/components/security-report-chart";

export default function Home() {
  const [reports, setReports] = useState<SecurityReport[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const {data, error} = await supabase.from("security_reports").select("*");
      if (error) console.error("Error fetching reports:", error);
      else setReports(data || []);
    }
    fetchReports();
  }, []);

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between p-8 bg-zinc-800 text-white">
      <h1 className="text-4xl font-bold mb-4 ">Security Checker Dashboard</h1>

      <SecurityStatsChart reports={reports} />
      <SecurityReportTable reports={reports} />
    </main>
  );
}
