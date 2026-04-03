import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Separator } from "@components/ui/separator/Separator";

const SeparatorPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Separator" description="Visually or semantically separates content." />

    <ShowcaseCard
      title="Horizontal (Default)"
      code={`<div className="space-y-4">\n  <div>\n    <h4 className="text-sm font-medium">Title</h4>\n    <p className="text-sm text-muted-foreground">Description text here.</p>\n  </div>\n  <Separator />\n  <div>\n    <h4 className="text-sm font-medium">Another Section</h4>\n    <p className="text-sm text-muted-foreground">More content below.</p>\n  </div>\n</div>`}
    >
      <div className="w-full space-y-4">
        <div>
          <h4 className="text-sm font-medium">Title</h4>
          <p className="text-sm text-muted-foreground">Description text here.</p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium">Another Section</h4>
          <p className="text-sm text-muted-foreground">More content below.</p>
        </div>
      </div>
    </ShowcaseCard>

    <ShowcaseCard
      title="Vertical"
      code={`<div className="flex h-5 items-center gap-4 text-sm">\n  <span>Blog</span>\n  <Separator orientation="vertical" />\n  <span>Docs</span>\n  <Separator orientation="vertical" />\n  <span>Source</span>\n</div>`}
    >
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </ShowcaseCard>

    <ShowcaseCard
      title="Variants"
      code={`<Separator variant="default" />\n<Separator variant="muted" />\n<Separator variant="primary" />\n<Separator variant="dashed" />`}
    >
      <div className="w-full space-y-6">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Default</p>
          <Separator variant="default" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Muted</p>
          <Separator variant="muted" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Primary</p>
          <Separator variant="primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">Dashed</p>
          <Separator variant="dashed" />
        </div>
      </div>
    </ShowcaseCard>
  </div>
);

export default SeparatorPage;
