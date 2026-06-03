'use client';

import { Tabs } from 'fumadocs-ui/components/tabs';
import { useEffect, useState, type ReactNode } from 'react';

/**
 * Tabs whose active tab can be driven by the URL hash, so a Mermaid node link
 * (`click NODE href "#hash"`) can switch tabs. `hashes[i]` maps to tab i.
 *
 * fumadocs simple Tabs (items mode) is uncontrolled, so we switch by remounting
 * with a new `defaultIndex` via `key`.
 */
export function HashTabs({
  items,
  hashes,
  children,
}: {
  items: string[];
  hashes: string[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace(/^#/, '');
      const i = hashes.indexOf(h);
      if (i >= 0) setIndex(i);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, [hashes]);

  return (
    <Tabs items={items} defaultIndex={index} key={index}>
      {children}
    </Tabs>
  );
}
