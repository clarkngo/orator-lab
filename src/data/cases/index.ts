import { outdoorBoysCase } from "./outdoorBoys";
import { schmidtCase } from "./schmidt";
import type { CaseStudy } from "../types";

export { schmidtCase } from "./schmidt";
export { outdoorBoysCase } from "./outdoorBoys";
export * from "../types";

export const CASE_STUDIES: CaseStudy[] = [schmidtCase, outdoorBoysCase];

export const DEFAULT_CASE_ID = schmidtCase.id;

const STORAGE_KEY = "orator-lab-active-case";

function caseIdFromHash(): string | null {
  const query = window.location.hash.split("?")[1];
  if (!query) return null;
  const fromHash = new URLSearchParams(query).get("case");
  if (fromHash && CASE_STUDIES.some((c) => c.id === fromHash)) return fromHash;
  return null;
}

export function loadCaseId(): string {
  const fromHash = caseIdFromHash();
  if (fromHash) return fromHash;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && CASE_STUDIES.some((c) => c.id === stored)) return stored;
  } catch {
    /* private browsing */
  }
  return DEFAULT_CASE_ID;
}

export function saveCaseId(caseId: string) {
  try {
    localStorage.setItem(STORAGE_KEY, caseId);
  } catch {
    /* ignore */
  }
}

export function getCaseById(caseId: string): CaseStudy {
  return CASE_STUDIES.find((c) => c.id === caseId) ?? CASE_STUDIES[0];
}
