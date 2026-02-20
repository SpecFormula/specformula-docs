'use client';

import mermaid from 'mermaid';
import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    const theme = resolvedTheme === 'dark' ? 'dark' : 'default';

    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: 'loose',
    });

    mermaid
      .render(`mermaid-${id.replace(/:/g, '')}`, chart)
      .then((result) => {
        setSvg(result.svg);
      })
      .catch((error) => {
        console.error('Mermaid rendering error:', error);
      });
  }, [chart, id, resolvedTheme]);

  return (
    <div
      className="my-4 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
