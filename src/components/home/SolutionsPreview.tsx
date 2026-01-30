import Link from 'next/link';
import Image from 'next/image';

const solutions = [
  {
    title: "Automation's Last Mile",
    description: 'Eliminate the manual dispatch bottleneck with fast, repeatable strapping.',
    image: '/solutions/automation-last-mile.png',
  },
  {
    title: 'Ergonomic Safety',
    description: 'Zero bending, stationary operation, and reduced forklift-lane exposure.',
    image: '/solutions/ergonomics-before-after.png',
  },
  {
    title: 'Load Security Physics',
    description: 'Consistent tension protects loads against rail shock and sea sway.',
    image: '/solutions/load-security-physics.png',
  },
  {
    title: 'Harsh Environments',
    description: 'Reliable strapping in dusty, hot, or abrasive operations.',
    image: '/solutions/automation-warehouse.png',
  },
];

export default function SolutionsPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[#C8102E] text-xs uppercase tracking-[0.3em] font-semibold">
              Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Built for real-world dispatch challenges
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Explore practical scenarios where time savings, safety, and load integrity matter
              most.
            </p>
          </div>
          <Link
            href="/solutions"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:border-gray-900 transition"
          >
            View all solutions
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item) => (
            <Link
              key={item.title}
              href="/solutions"
              className="group rounded-2xl border border-gray-200 overflow-hidden hover:border-[#C8102E]/60 transition"
            >
              <div className="relative h-48 bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#C8102E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Illustrative scenario visuals shown for explanation only; not customer endorsements.
        </p>
      </div>
    </section>
  );
}
