import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Elite Experience | Ergopack India - Premium Strapping Solutions',
    description:
        'Experience the Ergopack Elite presentation - a jaw-dropping scroll journey showcasing German-engineered automated strapping solutions for India\'s top manufacturers.',
    keywords: [
        'Ergopack Elite',
        'Premium strapping',
        'Automated strapping India',
        'German engineering',
        'Industrial automation',
        'Pallet strapping',
    ],
    openGraph: {
        title: 'Ergopack Elite Experience',
        description: 'The Ultimate Strapping Solution for India\'s Elite Manufacturers',
        type: 'website',
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ergopack Elite Experience',
        description: 'German-engineered strapping excellence for India',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function EliteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="elite-page bg-black text-white min-h-screen">
            {children}
        </div>
    );
}
