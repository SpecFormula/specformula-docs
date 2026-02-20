import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'zh-TW',
  languages: ['zh-TW', 'en'],
  // Show all locales in URL for clarity
  hideLocale: 'never',
});
