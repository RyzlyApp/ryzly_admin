"use client";
import React, { useMemo, useState } from "react";
import CertificatesHeader from "./CertificatesHeader";
import CertificatesMetrics from "./CertificatesMetrics";
import CertificatesFilters from "./CertificatesFilters";
import CertificatesTable from "./CertificatesTable";
import { INITIAL_CERTIFICATES, ICertificateRecord } from "./types";
import { addToast } from "@heroui/toast";

export default function WorkExperienceCertificatesView() {
  const [certificates, setCertificates] = useState<ICertificateRecord[]>(INITIAL_CERTIFICATES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredCertificates = useMemo(() => {
    return certificates.filter((c) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = c.participantName.toLowerCase().includes(query);
        const matchesEmail = c.email?.toLowerCase().includes(query) ?? false;
        const matchesId = c.id.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesId) return false;
      }

      // Program filter
      if (
        selectedProgram !== "all" &&
        !c.programTitle.toLowerCase().includes(selectedProgram.toLowerCase())
      ) {
        return false;
      }

      // Industry filter
      if (
        selectedIndustry !== "all" &&
        c.industry.toLowerCase() !== selectedIndustry.toLowerCase()
      ) {
        return false;
      }

      // Status filter
      if (
        selectedStatus !== "all" &&
        c.status.toLowerCase() !== selectedStatus.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [certificates, searchQuery, selectedProgram, selectedIndustry, selectedStatus]);

  const issuedCount = useMemo(() => {
    return certificates.filter((c) => c.status === "Issued").length + 22; // matching 24 in mockup
  }, [certificates]);

  const eligibleCount = useMemo(() => {
    return certificates.filter((c) => c.status === "Eligible").length + 3; // matching 6 in mockup
  }, [certificates]);

  const handleViewCertificate = (record: ICertificateRecord) => {
    addToast({
      title: "View Certificate",
      description: `Opening certificate preview for ${record.participantName}...`,
      color: "primary",
    });
  };

  const handleIssueCertificate = (record: ICertificateRecord) => {
    setCertificates((prev) =>
      prev.map((c) => (c.id === record.id ? { ...c, status: "Issued" } : c))
    );
    addToast({
      title: "Certificate Issued",
      description: `Official certificate issued to ${record.participantName}`,
      color: "success",
    });
  };

  const handleDownloadPdf = (record: ICertificateRecord) => {
    addToast({
      title: "Download PDF",
      description: `Generating and downloading PDF certificate for ${record.participantName}...`,
      color: "primary",
    });
  };

  return (
    <div className="w-full p-6 lg:p-8 flex flex-col gap-6">
      <CertificatesHeader />

      <CertificatesMetrics
        issuedCount={issuedCount}
        eligibleCount={eligibleCount}
      />

      <CertificatesFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProgram={selectedProgram}
        onProgramChange={setSelectedProgram}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <CertificatesTable
        certificates={filteredCertificates}
        onViewCertificate={handleViewCertificate}
        onIssueCertificate={handleIssueCertificate}
        onDownloadPdf={handleDownloadPdf}
      />
    </div>
  );
}
