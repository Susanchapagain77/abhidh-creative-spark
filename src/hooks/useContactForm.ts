import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { fetchFromApi } from "@/lib/api";
import { stripHtml } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  subject: z.string().max(255).optional().or(z.literal("")),
  message: z.string().min(10, "Please include a few more details"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const submitContact = async (payload: ContactFormValues) => {
  return fetchFromApi("/contact-us", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "creative",
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      subject: payload.subject,
      message: payload.message,
    }),
  });
};

export const useContactForm = (defaultSubject = "") => {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: (response: unknown) => {
      const message =
        typeof response === "object" && response !== null && "message" in response
          ? stripHtml(String((response as { message: unknown }).message))
          : "Thanks for contacting Abhidh Creative. We will reach out shortly.";

      toast({
        title: "Message sent!",
        description: message,
      });

      form.reset({
        name: "",
        email: "",
        phone: "",
        subject: defaultSubject,
        message: "",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Unable to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    mutation.mutate(values);
  };

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
  };
};



