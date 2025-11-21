import { createContext, forwardRef, useContext, useId } from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

const Form = FormProvider;

const FormFieldContext = createContext({});

const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const context = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!context) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const fieldState = getFieldState(context.name, formState);

  return {
    id: itemContext.id,
    name: context.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  };
};

const FormItemContext = createContext({});

const FormItem = forwardRef(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return (
    <label
      ref={ref}
      className={cn('text-sm font-medium leading-none', error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef(({ children, className, ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={`${formDescriptionId} ${formMessageId}`.trim()}
      aria-invalid={!!error}
      className={className}
      {...props}
    >
      {children}
    </Slot>
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return <p ref={ref} id={formDescriptionId} className={cn('text-xs text-muted-foreground', className)} {...props} />;
});
FormDescription.displayName = 'FormDescription';

const FormMessage = forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message || children) : children;

  if (!body) return null;

  return (
    <p ref={ref} id={formMessageId} className={cn('text-xs font-medium text-destructive', className)} {...props}>
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription };

