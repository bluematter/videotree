import create from "zustand";

const useMedia = create((set: any) => ({
  media: [],
  addMedia: (media: any) =>
    set((state: any) => ({ media: [...state.media, media] })),
  deleteMedia: (id: string) =>
    set((state: any) => ({
      media: state.media.filter((media: any) => media.id !== id),
    })),
}));

export default useMedia;
