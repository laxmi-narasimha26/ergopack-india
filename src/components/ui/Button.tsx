import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-black text-white hover:bg-gray-900 focus-visible:ring-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:focus-visible:ring-gray-100',
        secondary:
          'bg-gray-800 text-white hover:bg-gray-700 focus-visible:ring-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 dark:focus-visible:ring-gray-300',
        outline:
          'border border-gray-800 bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-800 dark:border-gray-200 dark:text-gray-100 dark:hover:bg-gray-900 dark:focus-visible:ring-gray-200',
        ghost:
          'bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-800 dark:text-gray-100 dark:hover:bg-gray-900 dark:focus-visible:ring-gray-200',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
