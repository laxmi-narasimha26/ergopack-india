'use client';

/**
 * FigmaInfographicEmbed
 *
 * Embeds the "From 120s to 40s" infographic designed in Figma.
 * This is an interactive, design-tool-created component.
 */
export default function FigmaInfographicEmbed() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Interactive Figma Embed */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-neutral-200">
            <iframe
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              width="100%"
              height="600"
              src="https://embed.figma.com/design/FJ8htLqCBSPY8aw9U5Mj5W/Untitled?embed-host=share"
              allowFullScreen
              className="w-full"
            />
          </div>

          {/* Fallback text for accessibility */}
          <p className="text-center text-neutral-500 text-sm mt-4">
            Interactive infographic: From a 120-Second Liability to a 40-Second Asset
          </p>
        </div>
      </div>
    </section>
  );
}
