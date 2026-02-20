'use client';

import { useParams, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { i18n } from '@/lib/i18n';
import { Globe, ChevronDown } from 'lucide-react';

const languageNames: Record<string, string> = {
  'zh-TW': '繁體中文',
  en: 'English',
};

export function LanguageToggle() {
  const params = useParams();
  const pathname = usePathname();
  const currentLang = (params.lang as string) || i18n.defaultLanguage;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (newLang: string) => {
    const segments = pathname.split('/').filter(Boolean);

    // Replace the language segment
    if (i18n.languages.includes(segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }

    window.location.href = '/' + segments.join('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{languageNames[currentLang] || currentLang}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-36 rounded-md border bg-fd-popover shadow-lg z-50">
          {i18n.languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                switchLanguage(lang);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                currentLang === lang
                  ? 'bg-fd-accent text-fd-accent-foreground font-medium'
                  : 'text-fd-popover-foreground hover:bg-fd-accent'
              }`}
            >
              {languageNames[lang] || lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
