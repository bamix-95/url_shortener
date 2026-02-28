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

const UrlshortenerForm = () => {
  const form = useForm<ShortenURLFormType>({
    resolver: zodResolver(shortenUrlSchema),
    defaultValues: {
      longUrl: "",
    },
  });

  const handleShorten = async (data: ShortenURLFormType) => {
    console.log(data);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleShorten)}
          >
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
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={false}>
                Shorten
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UrlshortenerForm;
