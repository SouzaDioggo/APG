import { Plus, Layout, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import {
  ContentBlock,
  PostBlockEditorProps,
} from "@/Interfaces/Interface-Post";

export function PostBlockEditor({ blocks, setBlocks }: PostBlockEditorProps) {
  const addBlock = () => {
    setBlocks([
      ...blocks,
      { type: "text", content: "", order: blocks.length + 1 },
    ]);
  };

  const removeBlock = (index: number) => {
    if (blocks.length === 1) return;
    const newBlocks = blocks
      .filter((_, i) => i !== index)
      .map((b, i) => ({ ...b, order: i + 1 }));
    setBlocks(newBlocks);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];
    setBlocks(newBlocks.map((b, i) => ({ ...b, order: i + 1 })));
  };

  const updateBlock = (index: number, value: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = value;
    setBlocks(newBlocks);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b pb-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Conteúdo do Artigo
        </h4>
        <button
          type="button"
          onClick={addBlock}
          className="bg-[#1a4d7a]/5 hover:bg-[#1a4d7a] text-[#1a4d7a] hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-[10px] font-bold uppercase transition-all cursor-pointer"
        >
          <Plus className="w-3 h-3" /> Novo Bloco
        </button>
      </div>

      <div className="space-y-10">
        {blocks.map((block, index) => (
          <div key={index} className="group relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#1a4d7a] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase shadow-sm flex items-center gap-2">
                <Layout className="w-3 h-3" /> Bloco {block.order}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => moveBlock(index, "up")}
                  className="p-1.5 bg-slate-100 hover:bg-[#c9a961] hover:text-white rounded-md transition-colors cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, "down")}
                  className="p-1.5 bg-slate-100 hover:bg-[#c9a961] hover:text-white rounded-md transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className="p-1.5 bg-red-50 hover:bg-red-500 hover:text-white text-red-400 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              rows={6}
              value={block.content}
              onChange={(e) => updateBlock(index, e.target.value)}
              className="w-full p-6 bg-slate-50 border-none rounded-2xl focus:ring-0 text-slate-700 text-lg leading-relaxed"
              placeholder="Escreva o conteúdo deste bloco aqui..."
            />
          </div>
        ))}
      </div>
    </section>
  );
}
