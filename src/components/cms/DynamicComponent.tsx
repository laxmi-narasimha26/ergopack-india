/**
 * Dynamic Component Renderer
 *
 * This component renders page components dynamically based on the CMS configuration.
 * It maps component types from the backend to actual React components.
 */

'use client';

import React from 'react';
import { PageComponent } from '@/lib/cms-api';

interface DynamicComponentProps {
  component: PageComponent;
}

// Component implementations
const HeroComponent: React.FC<{ props: any }> = ({ props }) => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
      {props.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${props.backgroundImage})` }}
        />
      )}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">{props.headline}</h1>
        <p className="text-xl md:text-2xl text-neutral-300 mb-8">{props.subheadline}</p>
        {props.ctaText && props.ctaUrl && (
          <a
            href={props.ctaUrl}
            className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700
                     text-white font-semibold rounded-lg transition-colors"
          >
            {props.ctaText}
          </a>
        )}
      </div>
    </section>
  );
};

const CTAComponent: React.FC<{ props: any }> = ({ props }) => {
  return (
    <section className="py-20 bg-primary-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">{props.title}</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{props.description}</p>
        {props.buttonText && props.buttonUrl && (
          <a
            href={props.buttonUrl}
            className="inline-block px-8 py-4 bg-white text-primary-600
                     font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
          >
            {props.buttonText}
          </a>
        )}
      </div>
    </section>
  );
};

const FeaturesComponent: React.FC<{ props: any }> = ({ props }) => {
  const features = props.features || [];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature: any, index: number) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RichTextComponent: React.FC<{ props: any }> = ({ props }) => {
  // Render Editor.js content
  // You would need to implement Editor.js renderer here
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 prose prose-lg max-w-4xl">
        {/* Render Editor.js blocks */}
        <div dangerouslySetInnerHTML={{ __html: props.content?.html || '' }} />
      </div>
    </section>
  );
};

const ProductCarouselComponent: React.FC<{ props: any }> = ({ props }) => {
  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">{props.title || 'Our Products'}</h2>
        {/* Implement product carousel here */}
        <p className="text-center text-neutral-400">Product carousel component</p>
      </div>
    </section>
  );
};

const TestimonialsComponent: React.FC<{ props: any }> = ({ props }) => {
  const testimonials = props.testimonials || [];

  return (
    <section className="py-20 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <p className="text-neutral-700 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-neutral-500">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsComponent: React.FC<{ props: any }> = ({ props }) => {
  const stats = props.stats || [];

  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Component type mapping
const componentMap: Record<string, React.FC<{ props: any }>> = {
  hero: HeroComponent,
  cta: CTAComponent,
  features: FeaturesComponent,
  rich_text: RichTextComponent,
  product_carousel: ProductCarouselComponent,
  testimonials: TestimonialsComponent,
  stats: StatsComponent,
};

/**
 * Main Dynamic Component
 */
export const DynamicComponent: React.FC<DynamicComponentProps> = ({ component }) => {
  const Component = componentMap[component.component?.type || ''];

  if (!Component) {
    console.warn(`Unknown component type: ${component.component?.type}`);
    return null;
  }

  return <Component props={component.props} />;
};

export default DynamicComponent;
