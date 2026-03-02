import type { shortenUrl } from "@/lib/types";
import { create } from "zustand";

interface UrlStoreProps {
  shortUrl: shortenUrl | null;
  setShortUrl: (value: shortenUrl | null) => void;
}

const useUrlStore = create<UrlStoreProps>((set) => ({
  shortUrl: null,
  setShortUrl: (value) => set({ shortUrl: value }),
}));

export default useUrlStore;
