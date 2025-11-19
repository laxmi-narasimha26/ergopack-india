import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      error,
      errorMessage,
      label,
      helperText,
      options,
      children,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              'flex h-11 w-full appearance-none border bg-white px-4 py-2 pr-10 text-base transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:bg-gray-900 dark:text-gray-100',
              error
                ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:border-gray-900 focus:ring-gray-900 dark:focus:border-gray-100 dark:focus:ring-gray-100',
              className
            )}
            ref={ref}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-helper`
                : undefined
            }
            {...props}
          >
            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && errorMessage && (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-sm text-red-500"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${selectId}-helper`}
            className="mt-1.5 text-sm text-gray-600 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
