import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  Sparkles, 
  ArrowLeft, 
  Loader2, 
  RefreshCw,
  Lightbulb,
  Wand2,
  History,
  Trash2,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TweetCard } from "@/components/tweet-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Tweet } from "@shared/schema";

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
  id?: string;
}

interface TweetsResponse {
  tweets: Tweet[];
  success: boolean;
}

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [generatedTweet, setGeneratedTweet] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: historyData, isLoading: historyLoading } = useQuery<TweetsResponse>({
    queryKey: ["/api/tweets"],
  });

  const generateMutation = useMutation({
    mutationFn: async (message: string): Promise<GenerateResponse> => {
      const response = await apiRequest("POST", "/api/generate", { message });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.tweet) {
        setGeneratedTweet(data.tweet);
        queryClient.invalidateQueries({ queryKey: ["/api/tweets"] });
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

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/tweets/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tweets"] });
      toast({
        title: "Tweet deleted",
        description: "The tweet has been removed from your history.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete tweet.",
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

  const handleCopyFromHistory = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      toast({
        title: "Copied to clipboard",
        description: "Your tweet is ready to share!",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
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

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="overflow-visible">
                <CardHeader className="flex flex-row items-center justify-between gap-2 pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <History className="w-5 h-5 text-primary" />
                    Tweet History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="p-4 pt-0 space-y-3">
                      {historyLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                      ) : historyData?.tweets && historyData.tweets.length > 0 ? (
                        historyData.tweets.map((tweet) => (
                          <motion.div
                            key={tweet.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 rounded-lg bg-muted/50 space-y-2 group"
                          >
                            <p className="text-sm line-clamp-3" data-testid={`text-history-tweet-${tweet.id}`}>
                              {tweet.content}
                            </p>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs text-muted-foreground">
                                {formatDate(tweet.createdAt)}
                              </span>
                              <div className="flex items-center gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7"
                                  onClick={() => handleCopyFromHistory(tweet.content, tweet.id)}
                                  data-testid={`button-copy-history-${tweet.id}`}
                                >
                                  {copiedId === tweet.id ? (
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 text-destructive"
                                  onClick={() => deleteMutation.mutate(tweet.id)}
                                  disabled={deleteMutation.isPending}
                                  data-testid={`button-delete-history-${tweet.id}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              Topic: {tweet.topic}
                            </p>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <History className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            No tweets generated yet
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your generated tweets will appear here
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
