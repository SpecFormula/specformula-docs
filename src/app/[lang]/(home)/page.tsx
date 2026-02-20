import Link from 'next/link';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const isEnglish = lang === 'en';

  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">
        {isEnglish ? 'Welcome to SpecFormula AI' : '歡迎來到 SpecFormula AI'}
      </h1>
      <p>
        {isEnglish ? 'You can open ' : '你可以開啟 '}
        <Link href={`/${lang}/docs`} className="font-medium underline">
          {isEnglish ? '/docs' : '/docs'}
        </Link>
        {isEnglish ? ' and see the documentation.' : ' 來查看文件。'}
      </p>
    </div>
  );
}
