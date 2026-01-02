export type EditorBlock =
  | {
      type: "paragraph";
      data: {
        text: string;
      };
    }
  | {
      type: "header";
      data: {
        text: string;
        level: number;
      };
    }
  | {
      type: "list";
      data: {
        style: "ordered" | "unordered";
        items: string[];
      };
    }
  | {
      type: "quote";
      data: {
        text: string;
        caption?: string;
      };
    }
  | {
      type: "embed";
      data: {
        service?: string;
        source?: string;
        embed?: string;
        url?: string;
        width?: number;
        height?: number;
        caption?: string;
      };
    }
  // ✅ fallback for unsupported / future blocks
  | {
      type: string;
      data: any;
    };

export interface EditorOutputData {
  time?: number;
  blocks: EditorBlock[];
  version?: string;
}
