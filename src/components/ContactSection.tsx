import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="container mx-auto px-4 py-12 md:py-20 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to order or need advice?
          </h2>
          <p className="text-lg text-muted-foreground">
            Send us your project requirements, and we'll recommend the right media 
            and a competitive quote.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Visit Us</CardTitle>
              <CardDescription>Our warehouse and showroom</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    15 Stilt Street, The Reeds<br />
                    Centurion 0157<br />
                    South Africa
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full">
                <a
                  href="https://maps.google.com/?q=15+Stilt+Street+The+Reeds+Centurion+0157"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get in touch with our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <div>
                      <p className="text-foreground font-semibold">Clive</p>
                      <a
                        href="tel:+27824404465"
                        className="hover:text-accent transition-colors block"
                      >
                        +27 82 440 4465
                      </a>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Dawid</p>
                      <a
                        href="tel:+27722137792"
                        className="hover:text-accent transition-colors block"
                      >
                        +27 72 213 7792
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <div>
                      <p className="text-foreground font-semibold">General enquiries</p>
                      <a
                        href="mailto:info@mediahaus.co.za"
                        className="hover:text-accent transition-colors block"
                      >
                        info@mediahaus.co.za
                      </a>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">Dawid</p>
                      <a
                        href="mailto:sales1@mediayhause.co.za"
                        className="hover:text-accent transition-colors block"
                      >
                        sales1@mediayhause.co.za
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full">
                <a href="mailto:sales1@mediayhause.co.za">Email Dawid</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
