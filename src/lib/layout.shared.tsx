import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'anthropics',
  repo: 'specformula-docs',
  branch: 'main',
};

export function baseOptions(lang?: string): BaseLayoutProps {
  return {
    nav: {
      title: 'SpecFormula AI',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
