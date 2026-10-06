import type { IconName } from '../types';

const PART_PATHS: Record<IconName, string> = {
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  gpu: '<rect x="2" y="6" width="20" height="11" rx="2"/><circle cx="9" cy="11.5" r="3"/><circle cx="16.5" cy="11.5" r="2"/><path d="M5 17v2M8 17v2"/>',
  ram: '<rect x="2" y="7" width="20" height="9" rx="1.5"/><path d="M6 10v3M10 10v3M14 10v3M18 10v3M5 16v2M19 16v2"/>',
  mobo: '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="6" height="6" rx="1"/><path d="M16 7v10M7 16.5h6"/>',
  psu: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="10" cy="12" r="4"/><path d="M10 9.5v5M7.5 12h5M17 9v6"/>',
  ssd: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 11h6M7 13.5h4"/><circle cx="17" cy="12" r="1.2"/>',
};

export const partIcon = (name: IconName, size = 22): string =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${PART_PATHS[name]}</svg>`;

export const TICK =
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F1924" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>';

export const SEARCH =
  '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

export const SCALE =
  '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7zM19 7l-3 7a3 3 0 0 0 6 0l-3-7z"/></svg>';

export const ARROW =
  '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0F1924" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/** Placeholder do logo: troque pelo SVG oficial. */
export const LOGO =
  '<svg width="92" height="92" viewBox="0 0 24 24" fill="none" stroke="#4CF592" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M6 9h12a4 4 0 0 1 3.9 4.9l-.8 3.4a2.4 2.4 0 0 1-4.2.9L15 16H9l-1.9 2.2a2.4 2.4 0 0 1-4.2-.9l-.8-3.4A4 4 0 0 1 6 9z"/>' +
  '<path d="M7.5 12v2.5M6.25 13.25h2.5"/><circle cx="16" cy="12.4" r=".6" fill="#4CF592"/><circle cx="17.6" cy="14" r=".6" fill="#4CF592"/>' +
  '<path d="M12 9V5.5h3"/><circle cx="16" cy="5.5" r="1"/></svg>';
