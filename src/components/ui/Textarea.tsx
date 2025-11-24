import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      errorMessage,
      label,
      helperText,
      showCharCount,
      maxLength,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[120px] w-full border bg-white px-4 py-3 text-base transition-all duration-200',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:bg-gray-900 dark:text-gray-100',
            'resize-y',
            error
              ? 'border-red-500 focus:ring-red-500 dark:border-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:border-gray-900 focus:ring-gray-900 dark:focus:border-gray-100 dark:focus:ring-gray-100',
            className
          )}
          ref={ref}
          maxLength={maxLength}
          value={value}
          aria-invalid={error}
          aria-describedby={
            error && errorMessage
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...props}
        />
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex-1">
            {error && errorMessage && (
              <p id={`${textareaId}-error`} className="text-sm text-red-500" role="alert">
                {errorMessage}
              </p>
            )}
            {!error && helperText && (
              <p id={`${textareaId}-helper`} className="text-sm text-gray-600 dark:text-gray-400">
                {helperText}
              </p>
            )}
          </div>
          {showCharCount && maxLength && (
            <div className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {charCount}/{maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
