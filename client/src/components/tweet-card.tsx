import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Repeat2, Copy, Check, MessageCircle, Share, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface TweetCardProps {
  content: string;
  isLoading?: boolean;
}

export function TweetCard({ content, isLoading }: TweetCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Your tweet is ready to share!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const characterCount = content.length;
  const maxCharacters = 280;
  const isOverLimit = characterCount > maxCharacters;

  if (isLoading) {
    return (
      <Card className="p-6 overflow-visible">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="flex gap-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-4 w-16 bg-muted rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1 pt-2">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Crafting your viral tweet...</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="p-6 overflow-visible transition-all duration-300">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              TF
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-foreground" data-testid="text-tweet-author">
                TweetForge User
              </span>
              <span className="text-muted-foreground text-sm">@tweetforge</span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">Just now</span>
            </div>

            <p 
              className="mt-3 text-lg leading-relaxed whitespace-pre-wrap break-words"
              data-testid="text-tweet-content"
            >
              {content}
            </p>

            <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-6">
                <button 
                  className="flex items-center gap-2 text-muted-foreground transition-colors group"
                  aria-label="Reply"
                >
                  <MessageCircle className="h-5 w-5 group-hover:text-primary transition-colors" />
                </button>
                <button 
                  className="flex items-center gap-2 text-muted-foreground transition-colors group"
                  aria-label="Retweet"
                >
                  <Repeat2 className="h-5 w-5 group-hover:text-green-500 transition-colors" />
                </button>
                <button 
                  className="flex items-center gap-2 text-muted-foreground transition-colors group"
                  aria-label="Like"
                >
                  <Heart className="h-5 w-5 group-hover:text-red-500 transition-colors" />
                </button>
                <button 
                  className="flex items-center gap-2 text-muted-foreground transition-colors group"
                  aria-label="Share"
                >
                  <Share className="h-5 w-5 group-hover:text-primary transition-colors" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-sm ${isOverLimit ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                  {characterCount}/{maxCharacters}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                  data-testid="button-copy-tweet"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function TweetCardSkeleton() {
  return (
    <Card className="p-6 overflow-visible">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-full bg-muted animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="flex gap-2 flex-wrap">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </Card>
  );
}
