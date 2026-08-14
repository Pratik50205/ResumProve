"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Resume,
  PersonalDetails,
  Experience,
  Project,
  Education,
  SkillGroups,
  Certification,
  ResumeSettings
} from "@/types/resume";
import { SAMPLE_RESUMES, BLANK_RESUME } from "@/data/sampleResumes";
import { validateResume, ResumeValidationResult } from "@/lib/validation/resumeValidation";

const STORAGE_KEY = "resumprove_active_resume_v1";

export function useResumeState(initialSampleKey: string = "ml-engineer") {
  const [resume, setResume] = useState<Resume>(() => {
    return SAMPLE_RESUMES[initialSampleKey] || SAMPLE_RESUMES["ml-engineer"];
  });

  // History stack for Undo / Redo
  const [history, setHistory] = useState<Resume[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const isUndoRedoOperation = useRef<boolean>(false);

  // Autosave status
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutosaving, setIsAutosaving] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Validation
  const [validation, setValidation] = useState<ResumeValidationResult>(() => validateResume(resume));

  // 1. Initial load from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData) as Resume;
        if (parsed && parsed.personal && parsed.personal.fullName) {
          setResume(parsed);
          setHistory([parsed]);
          setHistoryIndex(0);
          setValidation(validateResume(parsed));
          setLastSaved(new Date());
          setIsLoaded(true);
          return;
        }
      }
    } catch (err) {
      console.warn("Failed to load saved resume from localStorage:", err);
    }
    const initial = SAMPLE_RESUMES[initialSampleKey] || SAMPLE_RESUMES["ml-engineer"];
    setResume(initial);
    setHistory([initial]);
    setHistoryIndex(0);
    setValidation(validateResume(initial));
    setIsLoaded(true);
  }, [initialSampleKey]);

  // 2. Debounced Autosave to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    setIsAutosaving(true);
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
        setLastSaved(new Date());
      } catch (err) {
        console.error("Autosave to localStorage failed:", err);
      } finally {
        setIsAutosaving(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [resume, isLoaded]);

  // 3. Helper to commit a state change to history
  const commitChange = useCallback((newResume: Resume) => {
    setResume(newResume);
    setValidation(validateResume(newResume));

    if (!isUndoRedoOperation.current) {
      setHistory((prevHistory) => {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        newHistory.push(newResume);
        // Limit history to 30 states
        if (newHistory.length > 30) newHistory.shift();
        return newHistory;
      });
      setHistoryIndex((prevIndex) => Math.min(prevIndex + 1, 29));
    }
    isUndoRedoOperation.current = false;
  }, [historyIndex]);

  // 4. Undo and Redo actions
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoOperation.current = true;
      const targetIndex = historyIndex - 1;
      const targetResume = history[targetIndex];
      if (targetResume) {
        setResume(targetResume);
        setHistoryIndex(targetIndex);
        setValidation(validateResume(targetResume));
      }
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoOperation.current = true;
      const targetIndex = historyIndex + 1;
      const targetResume = history[targetIndex];
      if (targetResume) {
        setResume(targetResume);
        setHistoryIndex(targetIndex);
        setValidation(validateResume(targetResume));
      }
    }
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // 5. Section Update Mutators
  const updateTitle = useCallback((title: string) => {
    commitChange({ ...resume, title, updatedAt: new Date().toISOString() });
  }, [resume, commitChange]);

  const updatePersonal = useCallback((personalChanges: Partial<PersonalDetails>) => {
    commitChange({
      ...resume,
      personal: { ...resume.personal, ...personalChanges },
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const updateSummary = useCallback((summary: string) => {
    commitChange({ ...resume, summary, updatedAt: new Date().toISOString() });
  }, [resume, commitChange]);

  // Experience Mutators
  const addExperience = useCallback((entry?: Partial<Experience>) => {
    const newEntry: Experience = {
      id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: entry?.title || "Job Title",
      company: entry?.company || "Company Name",
      location: entry?.location || "Location",
      startDate: entry?.startDate || "2023-01",
      endDate: entry?.endDate || "Present",
      isCurrent: entry?.isCurrent ?? true,
      technologies: entry?.technologies || [],
      bullets: entry?.bullets || [
        "Led key technical initiatives driving measurable performance improvements.",
        "Collaborated with cross-functional teams to architect high-reliability workflows."
      ]
    };
    commitChange({
      ...resume,
      experience: [newEntry, ...(resume.experience || [])],
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const updateExperience = useCallback((id: string, updates: Partial<Experience>) => {
    commitChange({
      ...resume,
      experience: resume.experience.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const removeExperience = useCallback((id: string) => {
    commitChange({
      ...resume,
      experience: resume.experience.filter((e) => e.id !== id),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const reorderExperience = useCallback((fromIndex: number, toIndex: number) => {
    const list = [...resume.experience];
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);
    commitChange({ ...resume, experience: list, updatedAt: new Date().toISOString() });
  }, [resume, commitChange]);

  const addExperienceBullet = useCallback((expId: string, bulletText: string = "New achievement bullet point.") => {
    commitChange({
      ...resume,
      experience: resume.experience.map((e) =>
        e.id === expId ? { ...e, bullets: [...e.bullets, bulletText] } : e
      ),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const updateExperienceBullet = useCallback((expId: string, index: number, text: string) => {
    commitChange({
      ...resume,
      experience: resume.experience.map((e) => {
        if (e.id !== expId) return e;
        const newBullets = [...e.bullets];
        newBullets[index] = text;
        return { ...e, bullets: newBullets };
      }),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const removeExperienceBullet = useCallback((expId: string, index: number) => {
    commitChange({
      ...resume,
      experience: resume.experience.map((e) => {
        if (e.id !== expId) return e;
        return { ...e, bullets: e.bullets.filter((_, i) => i !== index) };
      }),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  // Project Mutators
  const addProject = useCallback((entry?: Partial<Project>) => {
    const newProject: Project = {
      id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: entry?.name || "New Project Title",
      description: entry?.description || "Project summary and core architectural overview.",
      technologies: entry?.technologies || ["Python", "TypeScript", "React"],
      githubUrl: entry?.githubUrl || "",
      liveUrl: entry?.liveUrl || "",
      bullets: entry?.bullets || [
        "Architected full-stack implementation with clean modular separation.",
        "Implemented automated testing achieving 90%+ code coverage."
      ]
    };
    commitChange({
      ...resume,
      projects: [newProject, ...(resume.projects || [])],
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    commitChange({
      ...resume,
      projects: resume.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const removeProject = useCallback((id: string) => {
    commitChange({
      ...resume,
      projects: resume.projects.filter((p) => p.id !== id),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const addProjectBullet = useCallback((projId: string, bulletText: string = "Engineered core feature delivering sub-100ms response time.") => {
    commitChange({
      ...resume,
      projects: resume.projects.map((p) =>
        p.id === projId ? { ...p, bullets: [...p.bullets, bulletText] } : p
      ),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const updateProjectBullet = useCallback((projId: string, index: number, text: string) => {
    commitChange({
      ...resume,
      projects: resume.projects.map((p) => {
        if (p.id !== projId) return p;
        const newBullets = [...p.bullets];
        newBullets[index] = text;
        return { ...p, bullets: newBullets };
      }),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const removeProjectBullet = useCallback((projId: string, index: number) => {
    commitChange({
      ...resume,
      projects: resume.projects.map((p) => {
        if (p.id !== projId) return p;
        return { ...p, bullets: p.bullets.filter((_, i) => i !== index) };
      }),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  // Education Mutators
  const addEducation = useCallback((entry?: Partial<Education>) => {
    const newEdu: Education = {
      id: `edu-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      institution: entry?.institution || "University Name",
      degree: entry?.degree || "B.S. in Computer Science",
      fieldOfStudy: entry?.fieldOfStudy || "Computer Science",
      startDate: entry?.startDate || "2020-08",
      endDate: entry?.endDate || "2024-05",
      gpa: entry?.gpa || "",
      honors: entry?.honors || []
    };
    commitChange({
      ...resume,
      education: [...(resume.education || []), newEdu],
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const updateEducation = useCallback((id: string, updates: Partial<Education>) => {
    commitChange({
      ...resume,
      education: resume.education.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const removeEducation = useCallback((id: string) => {
    commitChange({
      ...resume,
      education: resume.education.filter((e) => e.id !== id),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  // Skills Mutators
  const addSkill = useCallback((category: keyof SkillGroups, skillName: string) => {
    const clean = skillName.trim();
    if (!clean) return;
    const currentList = (resume.skills[category] as string[]) || [];
    if (currentList.some(s => s.toLowerCase() === clean.toLowerCase())) return;

    commitChange({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: [...currentList, clean]
      },
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const removeSkill = useCallback((category: keyof SkillGroups, skillName: string) => {
    const currentList = (resume.skills[category] as string[]) || [];
    commitChange({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: currentList.filter(s => s.toLowerCase() !== skillName.toLowerCase())
      },
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  // Certifications Mutators
  const addCertification = useCallback((entry?: Partial<Certification>) => {
    const newCert: Certification = {
      id: `cert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: entry?.name || "Certification Title",
      issuer: entry?.issuer || "Issuing Organization",
      issueDate: entry?.issueDate || "2023-01",
      credentialId: entry?.credentialId || ""
    };
    commitChange({
      ...resume,
      certifications: [...(resume.certifications || []), newCert],
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const updateCertification = useCallback((id: string, updates: Partial<Certification>) => {
    commitChange({
      ...resume,
      certifications: resume.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  const removeCertification = useCallback((id: string) => {
    commitChange({
      ...resume,
      certifications: resume.certifications.filter((c) => c.id !== id),
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  // Settings & Templates
  const updateSettings = useCallback((settingsChanges: Partial<ResumeSettings>) => {
    commitChange({
      ...resume,
      settings: { ...(resume.settings || BLANK_RESUME.settings!), ...settingsChanges },
      updatedAt: new Date().toISOString()
    });
  }, [resume, commitChange]);

  // Load sample profile
  const loadSample = useCallback((key: string) => {
    const sample = SAMPLE_RESUMES[key];
    if (sample) {
      commitChange(JSON.parse(JSON.stringify(sample)));
    }
  }, [commitChange]);

  // Reset to blank resume
  const resetResume = useCallback(() => {
    commitChange(JSON.parse(JSON.stringify(BLANK_RESUME)));
  }, [commitChange]);

  // JSON Import & Export
  const importJSON = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.personal && parsed.personal.fullName !== undefined) {
        commitChange(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [commitChange]);

  const exportJSON = useCallback((): string => {
    return JSON.stringify(resume, null, 2);
  }, [resume]);

  return {
    resume,
    validation,
    canUndo,
    canRedo,
    undo,
    redo,
    lastSaved,
    isAutosaving,
    isLoaded,
    updateTitle,
    updatePersonal,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,
    addExperienceBullet,
    updateExperienceBullet,
    removeExperienceBullet,
    addProject,
    updateProject,
    removeProject,
    addProjectBullet,
    updateProjectBullet,
    removeProjectBullet,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addCertification,
    updateCertification,
    removeCertification,
    updateSettings,
    loadSample,
    resetResume,
    importJSON,
    exportJSON
  };
}
