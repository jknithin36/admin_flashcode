"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface AuthFormTypes<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

export default function AuthForm<T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormTypes<T>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
    console.log(data);
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field} // Add a key for each element if you're rendering a list
            control={form.control}
            name={field as Path<T>} // Make sure you're using the dynamic 'field' for the 'name' prop
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>

                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* <Button
          disabled={form.formState.isSubmitting}
          className="text-black bg-white w-full rounded-2 px-3 py-1.5 text-sm h-auto  min-h-12 font-medium"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button> */}
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full bg-white text-black font-semibold text-sm px-3 py-2 h-auto rounded-md"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Logging in..."
              : "Registering..."
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? (
          <p>
            New to an Flashcode? <Link href="/sign-up">Sign Up</Link>
          </p>
        ) : (
          <p>
            already have an account? <Link href="/sign-in">Sign In</Link>
          </p>
        )}
      </form>
    </Form>
  );
}
