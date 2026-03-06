'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Youtube } from '@tiptap/extension-youtube';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  List, ListOrdered, Heading2, Heading3, 
  Link as LinkIcon, AlignLeft, AlignCenter, AlignRight,
  Code, Quote, Undo, Redo, ImageIcon, Video, Table as TableIcon, FileCode
} from 'lucide-react';
import { Button } from './button';
import { useState } from 'react';
import { Input } from './input';

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [codeContent, setCodeContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.configure({ openOnClick: false }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ width: 640, height: 360 }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const addVideo = () => {
    if (videoUrl) {
      editor.chain().focus().setYoutubeVideo({ src: videoUrl }).run();
      setVideoUrl('');
      setShowVideoInput(false);
    }
  };

  const addCodeBlock = () => {
    if (codeContent) {
      editor.chain().focus().insertContent(`<pre><code>${codeContent}</code></pre>`).run();
      setCodeContent('');
      setShowCodeInput(false);
    }
  };

  return (
    <div className="border rounded-lg">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-200' : ''}>
          <Bold className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-200' : ''}>
          <Italic className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-gray-200' : ''}>
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-gray-200' : ''}>
          <Strikethrough className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-8 bg-gray-300 mx-1" />
        
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}>
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}>
          <Heading3 className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-8 bg-gray-300 mx-1" />
        
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}>
          <List className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}>
          <ListOrdered className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-8 bg-gray-300 mx-1" />
        
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowLinkInput(!showLinkInput)} className={editor.isActive('link') ? 'bg-gray-200' : ''}>
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowImageInput(!showImageInput)}>
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowVideoInput(!showVideoInput)}>
          <Video className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'bg-gray-200' : ''}>
          <Code className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowCodeInput(!showCodeInput)}>
          <FileCode className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}>
          <Quote className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-8 bg-gray-300 mx-1" />
        
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}>
          <TableIcon className="w-4 h-4" />
        </Button>
        {editor.isActive('table') && (
          <>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().deleteTable().run()} className="text-red-500">
              Delete Table
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().goToNextCell().run()}>
              Next Cell
            </Button>
          </>
        )}
        
        <div className="w-px h-8 bg-gray-300 mx-1" />
        
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}>
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}>
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}>
          <AlignRight className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-8 bg-gray-300 mx-1" />
        
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      
      {showLinkInput && (
        <div className="flex gap-2 p-2 border-b bg-gray-50">
          <Input placeholder="Enter URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addLink()} />
          <Button type="button" size="sm" onClick={addLink}>Add</Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setShowLinkInput(false)}>Cancel</Button>
        </div>
      )}
      
      {showImageInput && (
        <div className="flex gap-2 p-2 border-b bg-gray-50">
          <Input placeholder="Enter image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addImage()} />
          <Button type="button" size="sm" onClick={addImage}>Add</Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setShowImageInput(false)}>Cancel</Button>
        </div>
      )}
      
      {showVideoInput && (
        <div className="flex gap-2 p-2 border-b bg-gray-50">
          <Input placeholder="Enter YouTube URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addVideo()} />
          <Button type="button" size="sm" onClick={addVideo}>Add</Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setShowVideoInput(false)}>Cancel</Button>
        </div>
      )}
      
      {showCodeInput && (
        <div className="flex flex-col gap-2 p-2 border-b bg-gray-50">
          <textarea className="border rounded p-2 font-mono text-sm" rows={5} placeholder="Paste code here..." value={codeContent} onChange={(e) => setCodeContent(e.target.value)} />
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={addCodeBlock}>Add</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setShowCodeInput(false)}>Cancel</Button>
          </div>
        </div>
      )}
      
      <EditorContent 
        editor={editor} 
        className="p-4 min-h-[300px] [&_.ProseMirror]:outline-none [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_li]:my-1 [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mt-4 [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mt-3 [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-gray-300 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_code]:bg-gray-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a]:underline [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:rounded [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:my-4 [&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-gray-300 [&_.ProseMirror_td]:p-2 [&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-gray-300 [&_.ProseMirror_th]:p-2 [&_.ProseMirror_th]:bg-gray-100 [&_.ProseMirror_th]:font-bold [&_.ProseMirror_pre]:bg-gray-900 [&_.ProseMirror_pre]:text-white [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto"
      />
    </div>
  );
}

