import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import '../global.css';
import { Inter, Noto_Sans_TC } from 'next/font/google';
import { i18n } from '@/lib/i18n';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
});

const { provider } = defineI18nUI(i18n, {
  translations: {
    'zh-TW': {
      displayName: '繁體中文',
      search: '搜尋文件',
      searchNoResult: '找不到結果',
      toc: '目錄',
      tocNoHeadings: '無標題',
      lastUpdate: '最後更新',
      chooseTheme: '選擇主題',
      nextPage: '下一頁',
      previousPage: '上一頁',
      editOnGithub: '在 GitHub 上編輯',
    },
    en: {
      displayName: 'English',
    },
  },
});

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${notoSansTC.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider i18n={provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
