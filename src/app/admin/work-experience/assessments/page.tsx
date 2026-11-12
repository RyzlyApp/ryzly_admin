"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkExperienceAssessmentsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/work-experience/submissions");
  }, [router]);

  return null;
}
