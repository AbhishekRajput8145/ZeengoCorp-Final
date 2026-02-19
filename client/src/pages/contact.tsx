import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Turnstile } from "@/components/ui/turnstile";

const INTEREST_AREAS = [
  { value: "Real Estate", label: "Real Estate" },
  { value: "Security", label: "Security" },
  { value: "AI Solutions", label: "AI Solutions" },
  { value: "Others", label: "Others" }
];

export default function Contact() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      interestArea: "",
      message: "",
      bot_field: "",
      token: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      interestArea: string;
      message: string;
      token?: string;
    }) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible."
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  });

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Let's Connect</h1>
            <p className="text-xl text-gray-300">
              Have an innovative idea or looking to collaborate? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-black/40 border-gray-800">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((data) => contactMutation.mutate({
                        ...data,
                        token: form.getValues("token") || ""
                      }))}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-gray-900/50 border-gray-800"
                                placeholder="Your full name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className="bg-gray-900/50 border-gray-800"
                                placeholder="your@email.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interestArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area of Interest</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-gray-900/50 border-gray-800">
                                  <SelectValue placeholder="Select an area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {INTEREST_AREAS.map((area) => (
                                  <SelectItem key={area.value} value={area.value}>
                                    {area.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="bg-gray-900/50 border-gray-800"
                                placeholder="Tell us about your project or inquiry"
                                rows={5}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bot_field"
                        render={({ field }) => (
                          <FormItem className="hidden">
                            <FormControl>
                              <Input {...field} tabIndex={-1} autoComplete="off" />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-start">
                        <Turnstile
                          siteKey="0x4AAAAAAACKiLPAChAxdXBJs"
                          onVerify={(token) => {
                            form.setValue("token", token);
                          }}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-white text-black hover:bg-gray-100 font-bold"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}