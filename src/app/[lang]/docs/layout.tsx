import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { LanguageToggle } from '@/components/language-toggle';
import type { ReactNode } from 'react';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      {...baseOptions(lang)}
      sidebar={{
        banner: (
          <div className="mb-2">
            <LanguageToggle />
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
