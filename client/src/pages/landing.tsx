import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  Copy, 
  TrendingUp, 
  MessageSquare, 
  RefreshCw,
  ArrowRight,
  Twitter,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl" data-testid="link-logo">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>TweetForge</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild data-testid="button-header-cta">
              <Link href="/generate">
                Start Generating
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <motion.div
              className="text-center space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
              >
                <Sparkles className="w-4 h-4" />
                Powered by Lyzr AI
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              >
                Generate{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
                  Viral Tweets
                </span>
                <br />
                in Seconds
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Let AI craft the perfect tweets that captivate your audience 
                and maximize your engagement on Twitter/X.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button asChild size="lg" className="text-lg px-8 gap-2 group" data-testid="button-hero-cta">
                  <Link href="/generate">
                    Start Generating
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  No sign-up required
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="pt-12"
              >
                <Card className="max-w-xl mx-auto overflow-visible">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Twitter className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">AI Generated</span>
                          <span className="text-muted-foreground text-sm">@example</span>
                        </div>
                        <p className="mt-2 text-lg leading-relaxed">
                          Just discovered that consistency beats perfection every single time. 
                          Show up daily, even when it's messy. That's how legends are made.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Generate viral-worthy tweets in three simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: "Enter Your Topic",
                  description: "Type in your topic, idea, or the message you want to convey to your audience."
                },
                {
                  icon: Sparkles,
                  title: "AI Generates",
                  description: "Our AI analyzes viral patterns and crafts engaging tweets optimized for maximum reach."
                },
                {
                  icon: Copy,
                  title: "Copy & Share",
                  description: "Copy your generated tweet with one click and share it directly on Twitter/X."
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-visible">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-primary mb-2">
                        Step {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-card/50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why TweetForge?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The smart way to create engaging content for your audience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Generate compelling tweets in seconds, not hours. Spend less time writing, more time engaging."
                },
                {
                  icon: TrendingUp,
                  title: "Optimized for Virality",
                  description: "Our AI studies viral tweet patterns to help your content reach more people and drive engagement."
                },
                {
                  icon: RefreshCw,
                  title: "Unlimited Variations",
                  description: "Not satisfied? Generate as many variations as you need until you find the perfect tweet."
                },
                {
                  icon: CheckCircle2,
                  title: "No Sign-up Required",
                  description: "Start generating tweets immediately. No account creation, no email verification, just results."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-visible">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Go Viral?
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                Join thousands of creators using TweetForge to craft 
                engaging content that resonates with their audience.
              </p>
              <Button asChild size="lg" className="text-lg px-8 gap-2 group" data-testid="button-cta-section">
                <Link href="/generate">
                  Start Generating Now
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">TweetForge</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap justify-center">
              <span>About</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <span className="font-medium text-primary">Lyzr AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
