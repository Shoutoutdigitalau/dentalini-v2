'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Extension } from '@tiptap/core';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

// Custom FontSize extension
const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace('px', ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }: any) => {
        return chain().setMark('textStyle', { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }: any) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  },
});
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Link2, Image as ImageIcon, Undo, Redo, Table as TableIcon, 
  Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  onImageClick?: () => void;
  onInsertImage?: (url: string) => void;
}

export default function RichTextEditor({ content, onChange, onImageClick, onInsertImage }: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageSettings, setShowImageSettings] = useState(false);
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [imageAlign, setImageAlign] = useState('left');
  const [showTableInput, setShowTableInput] = useState(false);
  const [tableRows, setTableRows] = useState('3');
  const [tableCols, setTableCols] = useState('3');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank'
        }
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline,
      TextStyle,
      Color,
      FontSize,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4'
      }
    },
    immediatelyRender: false,
    editorStyle: {
      a: {
        color: '#0091BA',
        textDecoration: 'underline'
      }
    }
  });

  if (!editor) return null;

  // Expose insertImage method via onInsertImage
  if (onInsertImage) {
    (window as any).__editorInsertImage = (url: string) => {
      setImageUrl(url);
      setShowImageSettings(true);
    };
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      // Insert image with proper attributes
      const style: string[] = [];
      if (imageWidth) style.push(`width: ${imageWidth.includes('%') || imageWidth.includes('px') ? imageWidth : imageWidth + 'px'}`);
      if (imageHeight) style.push(`height: ${imageHeight.includes('%') || imageHeight.includes('px') || imageHeight === 'auto' ? imageHeight : imageHeight + 'px'}`);
      
      let htmlToInsert = `<img src="${imageUrl}"`;
      if (style.length > 0) {
        htmlToInsert += ` style="${style.join('; ')}"`;
      }
      htmlToInsert += ' />';
      
      // Wrap in paragraph with alignment
      if (imageAlign === 'center') {
        htmlToInsert = `<p style="text-align: center">${htmlToInsert}</p>`;
      } else if (imageAlign === 'right') {
        htmlToInsert = `<p style="text-align: right">${htmlToInsert}</p>`;
      } else {
        htmlToInsert = `<p>${htmlToInsert}</p>`;
      }
      
      editor.chain().focus().insertContent(htmlToInsert).run();
      
      setImageUrl('');
      setImageWidth('');
      setImageHeight('');
      setImageAlign('left');
      setShowImageInput(false);
      setShowImageSettings(false);
    }
  };

  const addTable = () => {
    const rows = parseInt(tableRows);
    const cols = parseInt(tableCols);
    if (rows > 0 && cols > 0) {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
      setTableRows('3');
      setTableCols('3');
      setShowTableInput(false);
    }
  };

  return (
    <div className="border border-slate-300 rounded-md bg-white">
      <style jsx global>{`
        .ProseMirror a {
          color: #0091BA;
          text-decoration: underline;
        }
        .ProseMirror a:hover {
          color: #007a9e;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          display: inline-block;
          margin: 0.5rem 0;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror li {
          margin: 0.25rem 0;
        }
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1rem 0;
          overflow: hidden;
        }
        .ProseMirror td,
        .ProseMirror th {
          min-width: 1em;
          border: 2px solid #cbd5e1;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: #f8fafc;
        }
        .ProseMirror .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(0, 145, 186, 0.1);
          pointer-events: none;
        }
      `}</style>
      <div className="border-b border-slate-300 p-2 bg-slate-50 flex flex-wrap gap-1">
        {/* Headings */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: level as any }).run();
            }
          }}
          className="border border-slate-300 rounded px-2 py-1 text-sm"
        >
          <option value="0">Paragraph</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => {
            const size = e.target.value;
            if (size) {
              editor.chain().focus().setFontSize(size).run();
            }
          }}
          className="border border-slate-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Font Size</option>
          <option value="12">12px</option>
          <option value="14">14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
          <option value="20">20px</option>
          <option value="24">24px</option>
          <option value="28">28px</option>
          <option value="32">32px</option>
          <option value="36">36px</option>
          <option value="48">48px</option>
        </select>

        {/* Text Color */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="h-8 w-12 border border-slate-300 rounded cursor-pointer"
          title="Text Color"
        />

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        {/* Text Formatting */}
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('underline') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="h-8 w-8 p-0"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('strike') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="h-8 w-8 p-0"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('code') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="h-8 w-8 p-0"
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        {/* Lists */}
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        {/* Alignment */}
        <Button
          type="button"
          size="sm"
          variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className="h-8 w-8 p-0"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className="h-8 w-8 p-0"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className="h-8 w-8 p-0"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className="h-8 w-8 p-0"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        {/* Table */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive('table') ? 'default' : 'ghost'}
            onClick={() => setShowTableInput(!showTableInput)}
            className="h-8 w-8 p-0"
            title="Insert Table"
          >
            <TableIcon className="h-4 w-4" />
          </Button>

          {editor.isActive('table') && (
            <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-300">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().addRowBefore().run()}
                className="h-8 px-2 text-xs hover:bg-green-100"
                title="Add row above"
              >
                ↑ Row
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className="h-8 px-2 text-xs hover:bg-green-100"
                title="Add row below"
              >
                ↓ Row
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                className="h-8 px-2 text-xs hover:bg-green-100"
                title="Add column left"
              >
                ← Col
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className="h-8 px-2 text-xs hover:bg-green-100"
                title="Add column right"
              >
                → Col
              </Button>
              <div className="w-px h-6 bg-slate-300 mx-1"></div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().deleteRow().run()}
                className="h-8 px-2 text-xs hover:bg-red-100 hover:text-red-600"
                title="Delete current row"
              >
                ✕ Row
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                className="h-8 px-2 text-xs hover:bg-red-100 hover:text-red-600"
                title="Delete current column"
              >
                ✕ Col
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().deleteTable().run()}
                className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                title="Delete entire table"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        {/* Link */}
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('link') ? 'default' : 'ghost'}
          onClick={() => setShowLinkInput(!showLinkInput)}
          className="h-8 w-8 p-0"
        >
          <Link2 className="h-4 w-4" />
        </Button>

        {/* Image */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => {
            if (onImageClick) {
              onImageClick();
            } else {
              setShowImageInput(!showImageInput);
            }
          }}
          className="h-8 w-8 p-0"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        {/* Undo/Redo */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          className="h-8 w-8 p-0"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          className="h-8 w-8 p-0"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="p-3 border-b border-slate-300 bg-slate-50 flex gap-2">
          <input
            type="url"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 px-3 py-1 border border-slate-300 rounded text-sm"
          />
          <Button type="button" size="sm" onClick={addLink}>Add</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setShowLinkInput(false)}>Cancel</Button>
        </div>
      )}

      {/* Image Settings */}
      {showImageSettings && (
        <div className="p-3 border-b border-slate-300 bg-slate-50">
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Width (e.g., 300 or 50%)"
                value={imageWidth}
                onChange={(e) => setImageWidth(e.target.value)}
                className="flex-1 px-3 py-1 border border-slate-300 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Height (e.g., 200 or auto)"
                value={imageHeight}
                onChange={(e) => setImageHeight(e.target.value)}
                className="flex-1 px-3 py-1 border border-slate-300 rounded text-sm"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-sm font-medium">Align:</label>
              <select
                value={imageAlign}
                onChange={(e) => setImageAlign(e.target.value)}
                className="px-3 py-1 border border-slate-300 rounded text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
              <Button type="button" size="sm" onClick={addImage} className="ml-auto">Insert</Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => {
                setShowImageSettings(false);
                setImageUrl('');
                setImageWidth('');
                setImageHeight('');
                setImageAlign('left');
              }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Input */}
      {showImageInput && (
        <div className="p-3 border-b border-slate-300 bg-slate-50 flex gap-2">
          <input
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 px-3 py-1 border border-slate-300 rounded text-sm"
          />
          <Button type="button" size="sm" onClick={() => {
            if (imageUrl) {
              setShowImageInput(false);
              setShowImageSettings(true);
            }
          }}>Next</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setShowImageInput(false)}>Cancel</Button>
        </div>
      )}

      {/* Table Input */}
      {showTableInput && (
        <div className="p-3 border-b border-slate-300 bg-slate-50">
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Rows:</label>
              <input
                type="number"
                min="1"
                max="20"
                value={tableRows}
                onChange={(e) => setTableRows(e.target.value)}
                className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Columns:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={tableCols}
                onChange={(e) => setTableCols(e.target.value)}
                className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
              />
            </div>
            <Button type="button" size="sm" onClick={addTable}>Insert Table</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setShowTableInput(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
