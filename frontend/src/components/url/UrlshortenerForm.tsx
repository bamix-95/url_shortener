import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  shortenUrlSchema,
  type ShortenURLFormType,
} from "@/validators/url-schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { shortenLongUrl } from "@/lib/api/url";
import useUrlStore from "@/store/url-store";
import { AxiosError } from "axios";
import { Card, CardContent } from "../ui/card";
import { Copy } from "lucide-react";

const UrlshortenerForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setShortUrl, shortUrl } = useUrlStore();

  const form = useForm<ShortenURLFormType>({
    resolver: zodResolver(shortenUrlSchema),
    defaultValues: {
      longUrl: "",
    },
    mode: "onChange",
  });

  const handleShorten = async (data: ShortenURLFormType) => {
    setIsLoading(true);
    try {
      const res = await shortenLongUrl(data);

      if (res.success && res.data) {
        toast.success(res.message || "Long URL shortened successfully.");

        setShortUrl(res.data);

        form.reset();
      } else {
        toast.error(res.message || "Failed to shorten long URL.");
      }
    } catch (error: unknown) {
      let message = "Failed to shorten long URL.";

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleShorten)}>
          <div className="flex flex-col sm:flex-row gap-2">
            <FormField
              control={form.control}
              name="longUrl"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Paste your long URL here"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="flex items-center justify-center"
            >
              {isLoading ? <Spinner /> : "Shorten"}
            </Button>
          </div>
          {shortUrl && (
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Your shortened URL:
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    type="text"
                    value={shortUrl.shortUrl}
                    className="font-medium"
                  />
                  <Button
                    onClick={copyToClipboard}
                    type="button"
                    variant="outline"
                    className="shrink-0"
                  >
                    <Copy className="size-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UrlshortenerForm;
