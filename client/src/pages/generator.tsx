import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { 
  Sparkles, 
  ArrowLeft, 
  Loader2, 
  RefreshCw,
  Lightbulb,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { TweetCard } from "@/components/tweet-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const examplePrompts = [
  "A motivational message about consistency",
  "Hot take on remote work culture",
  "Tech industry observation",
  "Life advice that sounds controversial but is true",
  "Startup wisdom for founders"
];

interface GenerateResponse {
  tweet: string;
  success: boolean;
}

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [generatedTweet, setGeneratedTweet] = useState<string | null>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (message: string): Promise<GenerateResponse> => {
      const response = await apiRequest("POST", "/api/generate", { message });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.tweet) {
        setGeneratedTweet(data.tweet);
      } else {
        toast({
          title: "Generation failed",
          description: "Could not generate a tweet. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Tell us what you want to tweet about.",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate(prompt);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleRegenerate = () => {
    if (prompt.trim()) {
      generateMutation.mutate(prompt);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors group" data-testid="link-back-home">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl absolute left-1/2 -translate-x-1/2" data-testid="link-logo-generator">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">TweetForge</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Generate Your Viral Tweet
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Enter your topic or idea below and let AI craft the perfect tweet for you.
            </p>
          </div>

          <Card className="overflow-visible">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="space-y-3">
                <label 
                  htmlFor="prompt-input" 
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Wand2 className="w-4 h-4 text-primary" />
                  What do you want to tweet about?
                </label>
                <Textarea
                  id="prompt-input"
                  placeholder="Enter your topic, idea, or the message you want to convey..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] text-base resize-none rounded-xl"
                  data-testid="input-prompt"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lightbulb className="w-4 h-4" />
                  <span>Try an example:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      data-testid={`button-example-${index}`}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending}
                  className="flex-1 h-12 text-base gap-2"
                  data-testid="button-generate"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Tweet
                    </>
                  )}
                </Button>
                {generatedTweet && (
                  <Button
                    variant="outline"
                    onClick={handleRegenerate}
                    disabled={generateMutation.isPending}
                    className="h-12 gap-2"
                    data-testid="button-regenerate"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {generateMutation.isPending && !generatedTweet && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TweetCard content="" isLoading />
              </motion.div>
            )}

            {generatedTweet && !generateMutation.isPending && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Generated Tweet
                  </span>
                </div>
                <TweetCard content={generatedTweet} />
              </motion.div>
            )}
          </AnimatePresence>

          {!generatedTweet && !generateMutation.isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Your generated tweet will appear here
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
