import { createClient } from "./client";
import { Resume } from "@/types/resume";
import { ResumeRow, ResumeVersionRow } from "./types";

export async function fetchUserResumes(): Promise<ResumeRow[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) return [];

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching resumes from cloud:", error);
    return [];
  }

  return (data as ResumeRow[]) || [];
}

export async function fetchResumeById(resumeId: string): Promise<ResumeRow | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) return null;

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .eq("user_id", userData.user.id)
    .single();

  if (error || !data) {
    console.error("Error fetching resume by id:", error);
    return null;
  }

  return data as ResumeRow;
}

export async function saveResumeToCloud(
  resume: Resume,
  title?: string,
  cloudId?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = createClient();
  if (!supabase) {
    return { success: false, error: "Cloud storage not configured" };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return { success: false, error: "User not authenticated" };
  }

  const userId = userData.user.id;
  const resumeTitle = title || resume.title || `${resume.personal.fullName || "My"} Resume`;

  try {
    if (cloudId) {
      // Update existing cloud resume
      const { data, error } = await supabase
        .from("resumes")
        .update({
          title: resumeTitle,
          template: resume.settings?.template || "ats-minimal",
          resume_data: resume,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cloudId)
        .eq("user_id", userId)
        .select("id")
        .single();

      if (error) throw error;
      return { success: true, id: data.id };
    } else {
      // Check if user has an existing resume to update or insert new
      const { data: existing } = await supabase
        .from("resumes")
        .select("id")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })
        .limit(1);

      if (existing && existing.length > 0) {
        const targetId = existing[0].id;
        const { data, error } = await supabase
          .from("resumes")
          .update({
            title: resumeTitle,
            template: resume.settings?.template || "ats-minimal",
            resume_data: resume,
            updated_at: new Date().toISOString(),
          })
          .eq("id", targetId)
          .eq("user_id", userId)
          .select("id")
          .single();

        if (error) throw error;
        return { success: true, id: data.id };
      } else {
        // Insert new primary resume
        const { data, error } = await supabase
          .from("resumes")
          .insert({
            user_id: userId,
            title: resumeTitle,
            template: resume.settings?.template || "ats-minimal",
            resume_data: resume,
            is_primary: true,
          })
          .select("id")
          .single();

        if (error) throw error;
        return { success: true, id: data.id };
      }
    }
  } catch (err: any) {
    console.error("Failed to save resume to cloud:", err);
    return { success: false, error: err.message || "Failed to save resume" };
  }
}

export async function deleteResumeFromCloud(resumeId: string): Promise<boolean> {
  const supabase = createClient();
  if (!supabase) return false;

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return false;

  const { error } = await supabase
    .from("resumes")
    .delete()
    .eq("id", resumeId)
    .eq("user_id", userData.user.id);

  if (error) {
    console.error("Failed to delete resume:", error);
    return false;
  }

  return true;
}

export async function createResumeSnapshot(
  resumeId: string,
  snapshot: Resume,
  changeSummary?: string
): Promise<boolean> {
  const supabase = createClient();
  if (!supabase) return false;

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return false;

  // Get current version count
  const { count } = await supabase
    .from("resume_versions")
    .select("*", { count: "exact", head: true })
    .eq("resume_id", resumeId);

  const nextVersion = (count || 0) + 1;

  const { error } = await supabase.from("resume_versions").insert({
    resume_id: resumeId,
    user_id: userData.user.id,
    version_number: nextVersion,
    snapshot,
    change_summary: changeSummary || `Version ${nextVersion}`,
  });

  if (error) {
    console.error("Failed to create snapshot:", error);
    return false;
  }

  return true;
}
