/**
 * memberUtils.js
 * Business logic for Member Data Processing, Role Normalization, Priority Sorting,
 * Image Link Conversion (Google Drive / ImageKit / Direct), and Social Links.
 */

export const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239aa0a6'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

/**
 * Normalizes member roles to the official priority order:
 * 1. Organizer (Final Year first, Pre-Final Year second)
 * 2. Management
 * 3. Web Development Lead
 * 4. Android Lead
 * 5. Competitive Programming (CP) Lead
 * 6. Cyber Security
 * 7. AIML
 * 8. Media and Promotion
 * 9. Blockchain
 * 10. Cloud Computing
 * 11. Data Science (DS)
 * 12. UI/UX Design
 * Unrecognized -> Other Members (placed at the end)
 */
export function normalizeRole(rawRole, rawYear) {
  const r = (rawRole || '').trim().toLowerCase();

  // Extract academic year if present in rawRole or rawYear
  let year = rawYear || null;
  if (!year) {
    if (r.includes('final year') && !r.includes('pre')) {
      year = 'Final Year';
    } else if (r.includes('pre-final') || r.includes('pre final')) {
      year = 'Pre-Final Year';
    }
  }

  // Ex-Organizer (sorted at the end)
  if (
    r.includes('ex-organizer') ||
    r.includes('ex organizer') ||
    r.includes('ex-organiser') ||
    r.includes('ex organiser') ||
    r.includes('former organizer') ||
    r.includes('past organizer')
  ) {
    return {
      category: 'Ex-Organizer',
      priority: 998,
      displayRole: 'Ex-Organizer',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 1. Organizer
  if (
    r.includes('organizer') ||
    r.includes('organiser') ||
    r.includes('lead organizer')
  ) {
    return {
      category: 'Organizer',
      priority: 1,
      displayRole: year ? `Organizer (${year})` : 'Organizer',
      academicYear: year,
      subPriority: year === 'Final Year' ? 1 : year === 'Pre-Final Year' ? 2 : 3,
    };
  }

  // 2. Management
  if (r.includes('manag') || r.includes('management') || r.includes('managment')) {
    return {
      category: 'Management',
      priority: 2,
      displayRole: 'Management Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 3. Web Development Lead
  if (
    r.includes('web') ||
    r.includes('frontend') ||
    r.includes('backend') ||
    r.includes('fullstack')
  ) {
    return {
      category: 'Web Development Lead',
      priority: 3,
      displayRole: 'Web Development Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 4. Android Lead
  if (
    r.includes('android') ||
    r.includes('andriod') ||
    r.includes('mobile') ||
    r.includes('flutter')
  ) {
    return {
      category: 'Android Lead',
      priority: 4,
      displayRole: 'Android Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 5. Competitive Programming (CP) Lead
  if (
    r.includes('cp') ||
    r.includes('competitive programming') ||
    r.includes('dsa') ||
    r.includes('problem solving')
  ) {
    return {
      category: 'Competitive Programming (CP) Lead',
      priority: 5,
      displayRole: 'CP Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 6. Cyber Security
  if (r.includes('cyber') || r.includes('security') || r.includes('infosec')) {
    return {
      category: 'Cyber Security',
      priority: 6,
      displayRole: 'Cyber Security Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 7. AIML
  if (
    r.includes('aiml') ||
    r.includes('ai/ml') ||
    r.includes('ai-ml') ||
    (r.includes('ai') && !r.includes('blockchain')) ||
    r.includes('machine learning')
  ) {
    return {
      category: 'AIML',
      priority: 7,
      displayRole: 'AIML Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 8. Media and Promotion
  if (
    r.includes('media') ||
    r.includes('promotion') ||
    r.includes('social') ||
    r.includes('outreach')
  ) {
    return {
      category: 'Media and Promotion',
      priority: 8,
      displayRole: 'Media & Promotion Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 9. Blockchain
  if (r.includes('blockchain') || r.includes('web3') || r.includes('crypto')) {
    return {
      category: 'Blockchain',
      priority: 9,
      displayRole: 'Blockchain Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 10. Cloud Computing
  if (
    r.includes('cloud') ||
    r.includes('devops') ||
    r.includes('gcp') ||
    r.includes('aws')
  ) {
    return {
      category: 'Cloud Computing',
      priority: 10,
      displayRole: 'Cloud Computing Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 11. Data Science (DS)
  if (
    r.includes('ds') ||
    r.includes('data science') ||
    r.includes('data analytics')
  ) {
    return {
      category: 'Data Science (DS)',
      priority: 11,
      displayRole: 'Data Science Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 12. UI/UX Design
  if (
    r.includes('ui') ||
    r.includes('ux') ||
    r.includes('design') ||
    r.includes('product design')
  ) {
    return {
      category: 'UI/UX Design',
      priority: 12,
      displayRole: 'UI/UX Design Lead',
      academicYear: year,
      subPriority: 1,
    };
  }

  // 13. Other Members (unrecognized)
  return {
    category: 'Other Members',
    priority: 999,
    displayRole: rawRole || 'Core Member',
    academicYear: year,
    subPriority: 1,
  };
}

/**
 * Handles Google Drive, ImageKit, or external profile image URLs.
 * Converts Google Drive open/view links to direct CDN thumbnail image links.
 */
export function formatImageUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Check if it's a Google Drive link
  if (trimmed.includes('drive.google.com')) {
    const match = trimmed.match(/(?:id=|file\/d\/)([\w-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  return trimmed;
}

/**
 * Cleans and validates social profile URLs.
 * Removes invisible/zero-width characters and ensures https:// prefix.
 */
export function normalizeUrl(url) {
  if (!url || typeof url !== 'string') return null;
  // Remove zero-width spaces or invisible Unicode chars
  let clean = url.replace(/[\u200B-\u200D\uFEFF\u2060]/g, '').trim();
  if (!clean) return null;

  // Must have a domain dot or slash to be considered a URL
  if (!clean.includes('.') && !clean.includes('/')) return null;

  if (!/^https?:\/\//i.test(clean)) {
    clean = 'https://' + clean;
  }
  return clean;
}

/**
 * Takes raw team members array, applies role normalization, URL formatting,
 * and sorts strictly by member display priority.
 */
export function getProcessedMembers(members) {
  if (!Array.isArray(members)) return [];

  const processed = members.map((m) => {
    const roleInfo = normalizeRole(m.role, m.academicYear);
    return {
      ...m,
      ...roleInfo,
      avatarUrl: formatImageUrl(m.image),
      githubUrl: normalizeUrl(m.github),
      linkedinUrl: normalizeUrl(m.linkedin),
    };
  });

  // Sort strictly by priority, subPriority, then name
  return processed.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    if (a.subPriority !== b.subPriority) {
      return a.subPriority - b.subPriority;
    }
    return a.name.localeCompare(b.name);
  });
}
