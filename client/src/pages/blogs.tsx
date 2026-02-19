import { getAllPosts } from "@/lib/posts";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Turnstile } from "@/components/ui/turnstile";

export default function Blogs() {
  const { toast } = useToast();
  // Use local markdown posts instead of API
  const blogs = getAllPosts();

  const form = useForm({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      name: "",
      email: "",
      token: ""
    }
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      await apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter."
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
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Blog</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, updates, and thought leadership from ZeengoCorp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="md:col-span-8">
              {blogs.length > 0 ? (
                <div className="space-y-8">
                  {blogs.map((post) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-2xl">{post.title}</CardTitle>
                          <CardDescription>
                            {new Date(post.date).toLocaleDateString()} • {post.readingTime}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 mb-6">{post.description}</p>
                          <Link href={`/blogs/${post.slug}`}>
                            <Button variant="secondary">Read Article</Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-300">No blog posts found.</p>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4">
              <div className="sticky top-24">
                {/* Newsletter Signup */}
                <Card className="bg-gray-900 border-gray-800 mb-8">
                  <CardHeader>
                    <CardTitle>Subscribe to Our Newsletter</CardTitle>
                    <CardDescription>
                      Get the latest updates directly in your inbox.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit((data) => newsletterMutation.mutate({
                          ...data,
                          token: form.getValues("token") || ""
                        }))}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Your Name"
                                  className="bg-gray-800"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Your Email"
                                  className="bg-gray-800"
                                />
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
                          className="w-full"
                          disabled={newsletterMutation.isPending}
                        >
                          Subscribe
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                {/* Affiliate Ads */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Featured Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "Business Analytics Tools",
                        "Security Solutions Guide",
                        "AI Implementation Handbook"
                      ].map((resource, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left justify-start"
                        >
                          {resource}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
