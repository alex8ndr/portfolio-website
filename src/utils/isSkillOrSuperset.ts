// One-way superset/subset skills for flexible highlighting

const SUPERSET_SKILLS: Record<string, string[]> = {
    typescript: ['javascript'],
};

export function isSkillOrSuperset(superset: string, subset: string): boolean {
    const s1 = superset.trim().toLowerCase();
    const s2 = subset.trim().toLowerCase();
    if (s1 === s2) return true;
    if (SUPERSET_SKILLS[s1]?.includes(s2)) return true;
    return false;
}
