import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@components/ui/context-menu/ContextMenu";
import { Copy, Scissors, Clipboard, RotateCcw } from "lucide-react";

const ContextMenuPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Context Menu" description="Displays a menu at the pointer position on right-click." />

    <ShowcaseCard
      title="Default"
      code={`<ContextMenu>\n  <ContextMenuTrigger>\n    <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">\n      Right click here\n    </div>\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuLabel>Edit</ContextMenuLabel>\n    <ContextMenuSeparator />\n    <ContextMenuItem>Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuItem>Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuItem>Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut></ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground cursor-context-menu select-none">
            Right click here
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Scissors className="mr-2 h-4 w-4" /> Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Copy className="mr-2 h-4 w-4" /> Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Clipboard className="mr-2 h-4 w-4" /> Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <RotateCcw className="mr-2 h-4 w-4" /> Undo
            <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </ShowcaseCard>
  </div>
);

export default ContextMenuPage;
