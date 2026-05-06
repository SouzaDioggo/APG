export interface Post {
  id: number;
  title: string;
  categorieId: number;
  ImageUrl?: string | null;
  publicationDate: string;
  userId: number;
  image?: string;
  contents?: PostContent[];
}
export interface ModalNewPostProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface ContentBlock {
  type: "text" | "image";
  content: string;
  order: number;
}

export interface PostContent {
  id: number;
  type: string;
  content: string;
  order: number;
  postId?: number;
}

export interface PostBlockEditorProps {
  blocks: ContentBlock[];
  setBlocks: (blocks: ContentBlock[]) => void;
}

export interface CreatePostPayload {
  title: string;
  categorieId: number;
  publicationDate: string;
  content: string;
  imageUrl: string | null;
}
