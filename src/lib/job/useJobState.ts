"use client";

import { useState, useEffect, useCallback } from "react";
import {
  JobDescription,
  ParsedJob,
  SkillRequirement,
  WorkplaceType,
} from "@/types/job";
import { parseJobDescription } from "@/lib/parser/jobParser";
import { SAMPLE_JOBS, getSampleJob } from "@/data/sampleJobs";
import { normalizeSkillName, getSkillDefinition } from "@/data/skills";

const JOB_STORAGE_KEY = "resumprove_active_job_v1";

const DEFAULT_BLANK_JOB: JobDescription = {
  id: "custom-job",
  title: "",
  company: "",
  rawText: "",
  workplaceType: "Remote",
  createdAt: new Date().toISOString(),
};

export function useJobState(initialSampleKey: string = "stripe-fullstack") {
  const [job, setJob] = useState<JobDescription>(() => {
    const sample = getSampleJob(initialSampleKey);
    return sample || DEFAULT_BLANK_JOB;
  });

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // 1. Initial load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(JOB_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.rawText === "string") {
          setJob(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load saved job description:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Persist to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(JOB_STORAGE_KEY, JSON.stringify(job));
    } catch (e) {
      console.warn("Failed to persist job description:", e);
    }
  }, [job, isLoaded]);

  // Actions
  const updateRawText = useCallback((text: string) => {
    setJob((prev) => ({
      ...prev,
      rawText: text,
    }));
  }, []);

  const updateTitle = useCallback((title: string) => {
    setJob((prev) => ({
      ...prev,
      title,
      parsedData: prev.parsedData ? { ...prev.parsedData, role: title } : undefined,
    }));
  }, []);

  const updateCompany = useCallback((company: string) => {
    setJob((prev) => ({
      ...prev,
      company,
      parsedData: prev.parsedData ? { ...prev.parsedData, company } : undefined,
    }));
  }, []);

  const updateWorkplaceType = useCallback((workplaceType: WorkplaceType) => {
    setJob((prev) => ({
      ...prev,
      workplaceType,
      parsedData: prev.parsedData ? { ...prev.parsedData, workplaceType } : undefined,
    }));
  }, []);

  const loadSampleJob = useCallback((sampleId: string) => {
    const sample = getSampleJob(sampleId);
    if (sample) {
      setJob(sample);
    }
  }, []);

  const analyzeJob = useCallback(async () => {
    if (!job.rawText || job.rawText.trim().length === 0) return;

    setIsAnalyzing(true);
    try {
      // Deterministic parser runs synchronously & reliably
      const parsed = parseJobDescription(job.rawText, job.title, job.company);
      setJob((prev) => ({
        ...prev,
        title: prev.title || parsed.role,
        company: prev.company || parsed.company,
        location: prev.location || parsed.location,
        workplaceType: prev.workplaceType || parsed.workplaceType,
        parsedData: parsed,
      }));
    } catch (err) {
      console.error("Error analyzing job:", err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [job.rawText, job.title, job.company]);

  const addRequiredSkill = useCallback((skillName: string) => {
    const normalized = normalizeSkillName(skillName);
    const def = getSkillDefinition(normalized);
    const category = def ? def.category : "Tools";

    setJob((prev) => {
      if (!prev.parsedData) return prev;

      const exists = prev.parsedData.requiredSkills.some(
        (s) => s.name.toLowerCase() === normalized.toLowerCase()
      );
      if (exists) return prev;

      const newSkill: SkillRequirement = {
        name: normalized,
        normalizedName: normalized,
        category,
        isRequired: true,
        frequency: 1,
        importance: "high",
      };

      // Also remove from preferred if present
      const filteredPreferred = prev.parsedData.preferredSkills.filter(
        (s) => s.name.toLowerCase() !== normalized.toLowerCase()
      );

      return {
        ...prev,
        parsedData: {
          ...prev.parsedData,
          requiredSkills: [newSkill, ...prev.parsedData.requiredSkills],
          preferredSkills: filteredPreferred,
          technologies: Array.from(new Set([normalized, ...prev.parsedData.technologies])),
        },
      };
    });
  }, []);

  const addPreferredSkill = useCallback((skillName: string) => {
    const normalized = normalizeSkillName(skillName);
    const def = getSkillDefinition(normalized);
    const category = def ? def.category : "Tools";

    setJob((prev) => {
      if (!prev.parsedData) return prev;

      const exists = prev.parsedData.preferredSkills.some(
        (s) => s.name.toLowerCase() === normalized.toLowerCase()
      );
      if (exists) return prev;

      const newSkill: SkillRequirement = {
        name: normalized,
        normalizedName: normalized,
        category,
        isRequired: false,
        frequency: 1,
        importance: "medium",
      };

      return {
        ...prev,
        parsedData: {
          ...prev.parsedData,
          preferredSkills: [newSkill, ...prev.parsedData.preferredSkills],
          technologies: Array.from(new Set([normalized, ...prev.parsedData.technologies])),
        },
      };
    });
  }, []);

  const removeSkill = useCallback((skillName: string, isRequired: boolean) => {
    setJob((prev) => {
      if (!prev.parsedData) return prev;

      const targetList = isRequired ? "requiredSkills" : "preferredSkills";
      const updatedList = prev.parsedData[targetList].filter(
        (s) => s.name.toLowerCase() !== skillName.toLowerCase()
      );

      return {
        ...prev,
        parsedData: {
          ...prev.parsedData,
          [targetList]: updatedList,
        },
      };
    });
  }, []);

  const toggleSkillRequirement = useCallback((skillName: string) => {
    setJob((prev) => {
      if (!prev.parsedData) return prev;

      const inReq = prev.parsedData.requiredSkills.find(
        (s) => s.name.toLowerCase() === skillName.toLowerCase()
      );
      const inPref = prev.parsedData.preferredSkills.find(
        (s) => s.name.toLowerCase() === skillName.toLowerCase()
      );

      if (inReq) {
        // Move to preferred
        const updatedReq = prev.parsedData.requiredSkills.filter(
          (s) => s.name.toLowerCase() !== skillName.toLowerCase()
        );
        const updatedPref = [
          { ...inReq, isRequired: false, importance: "medium" as const },
          ...prev.parsedData.preferredSkills,
        ];
        return {
          ...prev,
          parsedData: {
            ...prev.parsedData,
            requiredSkills: updatedReq,
            preferredSkills: updatedPref,
          },
        };
      } else if (inPref) {
        // Move to required
        const updatedPref = prev.parsedData.preferredSkills.filter(
          (s) => s.name.toLowerCase() !== skillName.toLowerCase()
        );
        const updatedReq = [
          { ...inPref, isRequired: true, importance: "high" as const },
          ...prev.parsedData.requiredSkills,
        ];
        return {
          ...prev,
          parsedData: {
            ...prev.parsedData,
            requiredSkills: updatedReq,
            preferredSkills: updatedPref,
          },
        };
      }

      return prev;
    });
  }, []);

  const addResponsibility = useCallback((bullet: string) => {
    const clean = bullet.trim();
    if (!clean) return;

    setJob((prev) => {
      if (!prev.parsedData) return prev;
      return {
        ...prev,
        parsedData: {
          ...prev.parsedData,
          responsibilities: [...prev.parsedData.responsibilities, clean],
        },
      };
    });
  }, []);

  const removeResponsibility = useCallback((index: number) => {
    setJob((prev) => {
      if (!prev.parsedData) return prev;
      const updated = prev.parsedData.responsibilities.filter((_, i) => i !== index);
      return {
        ...prev,
        parsedData: {
          ...prev.parsedData,
          responsibilities: updated,
        },
      };
    });
  }, []);

  const resetJob = useCallback(() => {
    setJob(DEFAULT_BLANK_JOB);
    try {
      localStorage.removeItem(JOB_STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear job storage:", e);
    }
  }, []);

  return {
    job,
    parsed: job.parsedData,
    isAnalyzing,
    isLoaded,
    updateRawText,
    updateTitle,
    updateCompany,
    updateWorkplaceType,
    loadSampleJob,
    analyzeJob,
    addRequiredSkill,
    addPreferredSkill,
    removeSkill,
    toggleSkillRequirement,
    addResponsibility,
    removeResponsibility,
    resetJob,
  };
}

