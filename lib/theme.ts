export type Theme = 'light' | 'dark'

export function nextTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark'
}

// Runs before paint to set data-theme without a flash. Keep dependency-free.
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`
