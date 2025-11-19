import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Text from "@/components/Text";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Text as="h1" id="contact.hero.title" className="text-4xl md:text-5xl font-heading font-semibold mb-4" />
              <Text as="p" id="contact.hero.body" className="text-lg text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    Have questions about our products or need expert advice? Our team is ready to assist you.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-accent" />
                      <CardTitle>Our Location</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      15 Stilt Street, The Reeds<br />
                      Centurion 0157<br />
                      South Africa
                    </p>
                    <Button variant="outline" asChild>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=15+Stilt+Street+The+Reeds+Centurion+0157"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Maps
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-accent" />
                      <CardTitle>Phone & Email</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">Phone</p>
                      <div className="mt-3 space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Clive</p>
                          <a
                            href="tel:+27824404465"
                            className="text-lg font-medium hover:text-accent transition-colors block"
                          >
                            082 440 4465
                          </a>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Dawid</p>
                          <a
                            href="tel:+27722137792"
                            className="text-lg font-medium hover:text-accent transition-colors block"
                          >
                            072 213 7792
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">Email</p>
                      <div className="mt-3 flex flex-col gap-2 text-lg font-medium sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                          <p className="text-sm font-semibold text-foreground">Clive</p>
                          <a
                            href="mailto:clive@mediahaus.co.za"
                            className="hover:text-accent transition-colors"
                          >
                            clive@mediahaus.co.za
                          </a>
                        </div>
                        <span className="hidden sm:inline text-muted-foreground">•</span>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                          <p className="text-sm font-semibold text-foreground">Dawid</p>
                          <a
                            href="mailto:sales1@mediayhause.co.za"
                            className="hover:text-accent transition-colors"
                          >
                            sales1@mediayhause.co.za
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="flex-1">
                        <a href="mailto:clive@mediahaus.co.za">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Clive
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <a href="mailto:sales1@mediayhause.co.za">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Dawid
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send Us A Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your requirements..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
