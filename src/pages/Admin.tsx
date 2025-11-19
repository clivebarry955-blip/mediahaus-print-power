import { FormEvent, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useCopy } from "@/hooks/useCopy";
import { useMedia } from "@/hooks/useMedia";
import { useProducts } from "@/hooks/useProducts";
import Text from "@/components/Text";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Sparkles, Truck } from "lucide-react";
import { fetchAdminConfig, saveContent, setAdminSecret, uploadMediaFile, verifyAdminPassword } from "@/admin/api";
import type { MediaDictionary, SiteConfig, ProductsContent, ProductItem, ProductCategory } from "@/utils/content";

const curatedFonts = [
  {
    value: "inter",
    label: "Inter",
    name: "Inter",
    stack: "\"Inter\", \"Inter var\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
  {
    value: "space-grotesk",
    label: "Space Grotesk",
    name: "Space Grotesk",
    stack: "\"Space Grotesk\", \"Inter\", system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap",
  },
  {
    value: "work-sans",
    label: "Work Sans",
    name: "Work Sans",
    stack: "\"Work Sans\", \"Inter\", system-ui, sans-serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap",
  },
  {
    value: "eb-garamond",
    label: "EB Garamond",
    name: "EB Garamond",
    stack: "\"EB Garamond\", Georgia, \"Times New Roman\", serif",
    importUrl: "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap",
  },
  {
    value: "lora",
    label: "Lora",
    name: "Lora",
    stack: "\"Lora\", \"EB Garamond\", Georgia, serif",
    importUrl: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&display=swap",
  },
];

const Admin = () => {
  const authStorageKey = "mediahaus-admin-secret";
  const site = useSiteConfig();
  const { copy, keys: copyKeys, t } = useCopy();
  const { media } = useMedia();
  const { products } = useProducts();
  const { toast } = useToast();

  const [configLoading, setConfigLoading] = useState(true);
  const [adminEnabled, setAdminEnabled] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [siteDraft, setSiteDraft] = useState<SiteConfig>(site);
  const [copyDraft, setCopyDraft] = useState(copy);
  const [mediaDraft, setMediaDraft] = useState<MediaDictionary>(media);
  const [productsDraft, setProductsDraft] = useState<ProductsContent>(products);
  const [filter, setFilter] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await fetchAdminConfig();
        setAdminEnabled(Boolean(config.enabled));
        setRequiresPassword(Boolean(config.requiresPassword));
        if (!config.enabled) {
          setAuthenticated(false);
          return;
        }
        if (!config.requiresPassword) {
          setAuthenticated(true);
          setAdminSecret(null);
          if (typeof window !== "undefined") {
            window.sessionStorage.removeItem(authStorageKey);
          }
          return;
        }
        if (typeof window !== "undefined") {
          const storedSecret = window.sessionStorage.getItem(authStorageKey);
          if (storedSecret) {
            setAdminSecret(storedSecret);
            try {
              await verifyAdminPassword();
              setAuthenticated(true);
            } catch {
              window.sessionStorage.removeItem(authStorageKey);
              setAuthenticated(false);
            }
          }
        }
      } catch (error) {
        setConfigError(error instanceof Error ? error.message : String(error));
      } finally {
        setConfigLoading(false);
      }
    };
    loadConfig();
  }, []);

  useEffect(() => setSiteDraft(site), [site]);
  useEffect(() => setCopyDraft(copy), [copy]);
  useEffect(() => setMediaDraft(media), [media]);
  useEffect(() => setProductsDraft(products), [products]);

  const filteredKeys = useMemo(() => {
    if (!filter) return copyKeys;
    const lower = filter.toLowerCase();
    return copyKeys.filter((key) => key.toLowerCase().includes(lower));
  }, [copyKeys, filter]);

  const mediaKeys = useMemo(() => Object.keys(mediaDraft), [mediaDraft]);
  const productCategories = productsDraft.categories ?? [];
  const productItems = productsDraft.products ?? [];
  const updateCopyKey = (key: string, value: string) => {
    setCopyDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFontSelect = (slot: "primary" | "secondary", value: string) => {
    const preset = curatedFonts.find((font) => font.value === value);
    if (!preset) return;
    setSiteDraft((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [slot]: {
          ...(prev.fonts[slot] ?? preset),
          name: preset.name,
          stack: preset.stack,
          importUrl: preset.importUrl,
        },
      },
    }));
  };

  const handleFontField = (slot: "primary" | "secondary", field: "stack" | "importUrl", value: string) => {
    setSiteDraft((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [slot]: {
          ...(prev.fonts[slot] ?? prev.fonts.primary),
          [field]: value,
        },
      },
    }));
  };

  const handleSiteSave = async () => {
    try {
      setSaving("site");
      await saveContent("site", siteDraft);
      toast({ title: "Site settings saved" });
    } catch (error) {
      toast({
        title: "Failed to save site settings",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const handleCopySave = async () => {
    try {
      setSaving("copy");
      await saveContent("copy", copyDraft);
      toast({ title: "Copy updated" });
    } catch (error) {
      toast({
        title: "Failed to save copy",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const handleMediaSave = async () => {
    try {
      setSaving("media");
      await saveContent("media", mediaDraft);
      toast({ title: "Media library saved" });
    } catch (error) {
      toast({
        title: "Failed to save media",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const updateProduct = (productId: string, updater: (product: ProductItem) => ProductItem) => {
    setProductsDraft((prev) => ({
      ...prev,
      products: prev.products.map((product) => (product.id === productId ? updater(product) : product)),
    }));
  };

  const updateCategory = (categoryId: string, updates: Partial<ProductCategory>) => {
    setProductsDraft((prev) => ({
      ...prev,
      categories: prev.categories.map((category) =>
        category.id === categoryId ? { ...category, ...updates } : category,
      ),
    }));
  };

  const updateProductField = (productId: string, field: keyof ProductItem, value: string) => {
    updateProduct(productId, (product) => ({ ...product, [field]: value }));
  };

  const updateProductSpec = (productId: string, specIndex: number, field: "label" | "value", value: string) => {
    updateProduct(productId, (product) => ({
      ...product,
      specs: product.specs.map((spec, index) =>
        index === specIndex ? { ...spec, [field]: value } : spec,
      ),
    }));
  };

  const addProductSpec = (productId: string) => {
    updateProduct(productId, (product) => ({
      ...product,
      specs: [...product.specs, { label: "", value: "" }],
    }));
  };

  const removeProductSpec = (productId: string, specIndex: number) => {
    updateProduct(productId, (product) => ({
      ...product,
      specs: product.specs.filter((_, index) => index !== specIndex),
    }));
  };

  const handleProductsSave = async () => {
    try {
      setSaving("products");
      await saveContent("products", productsDraft);
      toast({ title: "Product catalog saved" });
    } catch (error) {
      toast({
        title: "Failed to save products",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const handleMirrorSave = async () => {
    await handleSiteSave();
    await handleCopySave();
    await handleMediaSave();
    await handleProductsSave();
  };

  const handleUpload = async (id: string, file: File) => {
    try {
      const result = await uploadMediaFile(file);
      if (result?.src) {
        setMediaDraft((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            src: result.src,
          },
        }));
        toast({ title: "Uploaded", description: result.src });
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  if (configLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Loading Admin</CardTitle>
            <CardDescription>Please wait…</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!adminEnabled || configError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Admin Disabled</CardTitle>
            <CardDescription>
              {configError ? configError : <Text id="admin.locked" />}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (requiresPassword && !authenticated) {
    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await verifyAdminPassword(passwordInput);
        setAdminSecret(passwordInput);
        setAuthenticated(true);
        setPasswordInput("");
        setLoginError(null);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(authStorageKey, passwordInput);
        }
      } catch {
        setLoginError("Incorrect password");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter the password set in <code>VITE_ADMIN_PASSWORD</code> to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                  required
                />
              </div>
              {loginError && <p className="text-sm text-destructive">{loginError}</p>}
              <Button type="submit" className="w-full">
                Unlock admin
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogout = () => {
    if (!requiresPassword) return;
    setAuthenticated(false);
    setPasswordInput("");
    setAdminSecret(null);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(authStorageKey);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-semibold">Content Admin</h1>
          <p className="text-muted-foreground text-sm">
            Changes save back to <code>content/</code> and <code>public/media</code>, then commit to your Git repo to
            trigger a deploy.
          </p>
        </div>
        {requiresPassword && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Lock admin
            </Button>
          </div>
        )}

        <Tabs defaultValue="mirror" className="space-y-6">
          <TabsList className="grid md:grid-cols-5">
            <TabsTrigger value="mirror">Site mirror</TabsTrigger>
            <TabsTrigger value="fonts">Fonts</TabsTrigger>
            <TabsTrigger value="copy">Copy</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="mirror">
            <Card className="space-y-6">
              <CardHeader>
                <CardTitle>Homepage preview</CardTitle>
                <CardDescription>Mirror the hero, features, categories, testimonials and CTA exactly as they appear on the live site, with inline editors.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-10">
                <section className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
                  <div className="rounded-3xl bg-gradient-to-br from-secondary/80 to-background p-8 shadow-lg space-y-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Hero preview</p>
                    <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                      {copyDraft["hero.title"] ?? "Hero heading"}
                    </h1>
                    <p className="text-lg text-muted-foreground">{copyDraft["hero.subtitle"] ?? "Hero subtitle"}</p>
                    <div className="flex gap-3">
                      <div className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm">{copyDraft["hero.primaryCta"] ?? "Primary CTA"}</div>
                      <div className="px-4 py-2 rounded-full border border-border text-sm font-semibold">{copyDraft["hero.secondaryCta"] ?? "Secondary CTA"}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Hero title</Label>
                      <Input
                        value={copyDraft["hero.title"] ?? ""}
                        onChange={(event) => updateCopyKey("hero.title", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Hero subtitle</Label>
                      <Textarea
                        rows={2}
                        value={copyDraft["hero.subtitle"] ?? ""}
                        onChange={(event) => updateCopyKey("hero.subtitle", event.target.value)}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Primary CTA</Label>
                        <Input
                          value={copyDraft["hero.primaryCta"] ?? ""}
                          onChange={(event) => updateCopyKey("hero.primaryCta", event.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Secondary CTA</Label>
                        <Input
                          value={copyDraft["hero.secondaryCta"] ?? ""}
                          onChange={(event) => updateCopyKey("hero.secondaryCta", event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Hero image</Label>
                      <Select
                        value={siteDraft.media?.hero ?? ""}
                        onValueChange={(value) =>
                          setSiteDraft((prev) => ({
                            ...prev,
                            media: {
                              ...prev.media,
                              hero: value,
                            },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select media asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {mediaKeys.map((key) => (
                            <SelectItem key={key} value={key}>
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <p className="text-sm font-semibold uppercase text-muted-foreground">Features</p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { icon: Sparkles, titleKey: "features.0.title", bodyKey: "features.0.body" },
                      { icon: Shield, titleKey: "features.1.title", bodyKey: "features.1.body" },
                      { icon: Truck, titleKey: "features.2.title", bodyKey: "features.2.body" },
                    ].map(({ icon: Icon, titleKey, bodyKey }, index) => (
                      <Card key={titleKey} className="h-full border border-border bg-card">
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Icon className="w-6 h-6 text-primary" />
                            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Feature {index + 1}</span>
                          </div>
                          <h3 className="text-lg font-semibold">{copyDraft[titleKey] ?? "Title"}</h3>
                          <p className="text-sm text-muted-foreground">{copyDraft[bodyKey] ?? "Feature body"}</p>
                          <div className="space-y-2">
                            <Input
                              value={copyDraft[titleKey] ?? ""}
                              placeholder="Title"
                              onChange={(event) => updateCopyKey(titleKey, event.target.value)}
                            />
                            <Textarea
                              rows={2}
                              value={copyDraft[bodyKey] ?? ""}
                              onChange={(event) => updateCopyKey(bodyKey, event.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <p className="text-sm font-semibold uppercase text-muted-foreground">Product categories</p>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[
                      { nameKey: "categories.inkjet.title", descriptionKey: "categories.inkjet.description" },
                      { nameKey: "categories.solvent.title", descriptionKey: "categories.solvent.description" },
                      { nameKey: "categories.finishing.title", descriptionKey: "categories.finishing.description" },
                      { nameKey: "categories.dtf.title", descriptionKey: "categories.dtf.description" },
                    ].map(({ nameKey, descriptionKey }) => (
                      <Card key={nameKey} className="border border-border">
                        <CardContent className="space-y-3">
                          <h4 className="text-lg font-semibold">{copyDraft[nameKey] ?? "Category"}</h4>
                          <p className="text-sm text-muted-foreground">{copyDraft[descriptionKey] ?? "Description"}</p>
                          <Input
                            value={copyDraft[nameKey] ?? ""}
                            onChange={(event) => updateCopyKey(nameKey, event.target.value)}
                            placeholder="Category title"
                          />
                          <Textarea
                            rows={2}
                            value={copyDraft[descriptionKey] ?? ""}
                            onChange={(event) => updateCopyKey(descriptionKey, event.target.value)}
                            placeholder="Category description"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <p className="text-sm font-semibold uppercase text-muted-foreground">Testimonial</p>
                  <Card className="border border-border">
                    <CardContent className="space-y-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Preview</p>
                      <blockquote className="text-lg font-secondary text-foreground leading-relaxed">
                        “{copyDraft["testimonials.quote"] ?? "Testimonial quote"}”
                      </blockquote>
                      <p className="text-sm text-muted-foreground">
                        — {copyDraft["testimonials.attribution"] ?? "Attribution"}
                      </p>
                      <Textarea
                        rows={3}
                        value={copyDraft["testimonials.quote"] ?? ""}
                        onChange={(event) => updateCopyKey("testimonials.quote", event.target.value)}
                      />
                      <Input
                        value={copyDraft["testimonials.attribution"] ?? ""}
                        onChange={(event) => updateCopyKey("testimonials.attribution", event.target.value)}
                        placeholder="Attribution"
                      />
                    </CardContent>
                  </Card>
                </section>

                <section className="space-y-4">
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle>CTA section</CardTitle>
                      <CardDescription>Editable call-to-action that appears near the bottom of the homepage.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Main heading</Label>
                        <Input
                          value={copyDraft["cta.heading"] ?? ""}
                          onChange={(event) => updateCopyKey("cta.heading", event.target.value)}
                        />
                      </div>
                      <Textarea
                        rows={3}
                        value={copyDraft["cta.body"] ?? ""}
                        onChange={(event) => updateCopyKey("cta.body", event.target.value)}
                      />
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          value={copyDraft["cta.primary"] ?? ""}
                          onChange={(event) => updateCopyKey("cta.primary", event.target.value)}
                          placeholder="Primary CTA"
                        />
                        <Input
                          value={copyDraft["cta.secondary"] ?? ""}
                          onChange={(event) => updateCopyKey("cta.secondary", event.target.value)}
                          placeholder="Secondary CTA"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>CTA image</Label>
                        <Select
                          value={siteDraft.media?.cta ?? ""}
                          onValueChange={(value) =>
                            setSiteDraft((prev) => ({
                              ...prev,
                              media: {
                                ...prev.media,
                                cta: value,
                              },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select CTA image" />
                          </SelectTrigger>
                          <SelectContent>
                            {mediaKeys.map((key) => (
                              <SelectItem key={key} value={key}>
                                {key}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <div className="flex justify-end">
                  <Button onClick={handleMirrorSave} disabled={saving === "mirror"}>
                    Save preview to site
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fonts">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Text id="admin.fonts.heading" />
                </CardTitle>
                <CardDescription>
                  <Text id="admin.fonts.description" />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {["primary", "secondary"].map((slot) => {
                  const key = slot as "primary" | "secondary";
                  const current = siteDraft.fonts[key];
                  return (
                    <div key={slot} className="space-y-3">
                      <Label className="capitalize">{slot} font</Label>
                      <Select
                        value={curatedFonts.find((font) => font.name === current?.name)?.value}
                        onValueChange={(value) => handleFontSelect(key, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {curatedFonts.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Google Fonts URL</Label>
                          <Input
                            value={current?.importUrl ?? ""}
                            onChange={(event) => handleFontField(key, "importUrl", event.target.value)}
                            placeholder="https://fonts.googleapis.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Font stack</Label>
                          <Input
                            value={current?.stack ?? ""}
                            onChange={(event) => handleFontField(key, "stack", event.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Base size (px)</Label>
                    <Input
                      type="number"
                      min={12}
                      max={24}
                      value={siteDraft.fontSizes.basePx}
                      onChange={(event) =>
                        setSiteDraft((prev) => ({
                          ...prev,
                          fontSizes: { ...prev.fontSizes, basePx: Number(event.target.value) },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Heading scale</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={siteDraft.fontSizes.headingScale}
                      onChange={(event) =>
                        setSiteDraft((prev) => ({
                          ...prev,
                          fontSizes: { ...prev.fontSizes, headingScale: Number(event.target.value) },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Body scale</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={siteDraft.fontSizes.bodyScale}
                      onChange={(event) =>
                        setSiteDraft((prev) => ({
                          ...prev,
                          fontSizes: { ...prev.fontSizes, bodyScale: Number(event.target.value) },
                        }))
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleSiteSave} disabled={saving === "site"}>
                  {t("admin.save")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="copy">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Text id="admin.copy.heading" />
                </CardTitle>
                <CardDescription>
                  <Text id="admin.copy.description" />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder={t("admin.search.placeholder")}
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                />
                <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                  {filteredKeys.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      <Text id="admin.copy.empty" />
                    </p>
                  )}
                  {filteredKeys.map((key) => (
                    <div key={key} className="space-y-2">
                      <Label className="font-mono text-xs">{key}</Label>
                      <Textarea
                        rows={2}
                        value={copyDraft[key] ?? ""}
                        onChange={(event) =>
                          setCopyDraft((prev) => ({
                            ...prev,
                            [key]: event.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button onClick={handleCopySave} disabled={saving === "copy"}>
                  {t("admin.save")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Text id="admin.media.heading" />
                </CardTitle>
                <CardDescription>
                  <Text id="admin.media.description" />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {Object.entries(mediaDraft).map(([id, asset]) => (
                    <div key={id} className="border border-border rounded-lg p-4 space-y-3">
                      <div>
                        <p className="font-semibold">{id}</p>
                        <p className="text-sm text-muted-foreground">{asset.description}</p>
                      </div>
                      <div className="aspect-video rounded-md overflow-hidden bg-muted">
                        <img src={asset.src} alt={asset.alt || id} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-2">
                        <Label>Source</Label>
                        <Input
                          value={asset.src}
                          onChange={(event) =>
                            setMediaDraft((prev) => ({
                              ...prev,
                              [id]: { ...prev[id], src: event.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Alt key</Label>
                        <Input
                          value={asset.altKey ?? ""}
                          onChange={(event) =>
                            setMediaDraft((prev) => ({
                              ...prev,
                              [id]: { ...prev[id], altKey: event.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>{t("admin.upload.label")}</Label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              handleUpload(id, file);
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={handleMediaSave} disabled={saving === "media"}>
                  {t("admin.save")}
                </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product catalog</CardTitle>
              <CardDescription>Mirror the live catalog copy, specs and imagery so every field is editable.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {productCategories.map((category) => {
                const categoryProducts = productItems.filter(
                  (product) => product.categoryId === category.id,
                );
                return (
                  <div key={category.id} className="space-y-4 border-b border-border pb-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Category name</Label>
                        <Input
                          value={category.name}
                          onChange={(event) =>
                            updateCategory(category.id, { name: event.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          rows={2}
                          value={category.description}
                          onChange={(event) =>
                            updateCategory(category.id, { description: event.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {categoryProducts.map((product) => (
                        <div key={product.id} className="border border-border rounded-lg p-4 space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Product name</Label>
                              <Input
                                value={product.name}
                                onChange={(event) =>
                                  updateProductField(product.id, "name", event.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                rows={3}
                                value={product.description}
                                onChange={(event) =>
                                  updateProductField(product.id, "description", event.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Image asset</Label>
                              <Select
                                value={product.imageId}
                                onValueChange={(value) =>
                                  updateProductField(product.id, "imageId", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select media" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 overflow-y-auto">
                                  {mediaKeys.map((key) => (
                                    <SelectItem key={key} value={key}>
                                      {key}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Preview</Label>
                              {mediaDraft[product.imageId]?.src ? (
                                <div className="rounded-md overflow-hidden bg-muted">
                                  <img
                                    src={mediaDraft[product.imageId].src}
                                    alt={mediaDraft[product.imageId]?.alt || product.name}
                                    className="w-full h-24 object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="rounded-md h-24 bg-muted flex items-center justify-center text-sm text-muted-foreground">
                                  No image assigned
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="font-semibold text-sm">Specifications</Label>
                              <Button variant="ghost" size="sm" onClick={() => addProductSpec(product.id)}>
                                + Add spec
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {product.specs.map((spec, specIndex) => (
                                <div
                                  key={`${product.id}-spec-${specIndex}`}
                                  className="grid gap-2 md:grid-cols-[1fr,1fr,auto]"
                                >
                                  <Input
                                    value={spec.label}
                                    placeholder="Label"
                                    onChange={(event) =>
                                      updateProductSpec(product.id, specIndex, "label", event.target.value)
                                    }
                                  />
                                  <Input
                                    value={spec.value}
                                    placeholder="Value"
                                    onChange={(event) =>
                                      updateProductSpec(product.id, specIndex, "value", event.target.value)
                                    }
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeProductSpec(product.id, specIndex)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <Button onClick={handleProductsSave} disabled={saving === "products"}>
                {t("admin.save")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
