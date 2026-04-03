import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { ScrollArea } from "@components/ui/scroll-area/ScrollArea";
import { Separator } from "@components/ui/separator/Separator";

const tags = Array.from({ length: 50 }).map((_, i) => `v1.2.0-beta.${i + 1}`);

const ScrollAreaPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="ScrollArea" description="Augments native scroll functionality with custom styled scrollbars." />

    <ShowcaseCard
      title="Vertical Scroll"
      code={`<ScrollArea className="h-72 w-48 rounded-md border">\n  <div className="p-4">\n    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>\n    {tags.map((tag) => (\n      <>\n        <div className="text-sm" key={tag}>{tag}</div>\n        <Separator className="my-2" />\n      </>\n    ))}\n  </div>\n</ScrollArea>`}
    >
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <div key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </ShowcaseCard>

    <ShowcaseCard
      title="Horizontal Scroll"
      code={`<ScrollArea className="w-96 whitespace-nowrap rounded-md border" orientation="horizontal">\n  <div className="flex w-max space-x-4 p-4">\n    {artworks.map((artwork) => (\n      <figure key={artwork.artist} className="shrink-0">\n        <div className="overflow-hidden rounded-md">\n          <div className="h-[150px] w-[200px] bg-muted flex items-center justify-center text-muted-foreground">\n            {artwork.art}\n          </div>\n        </div>\n        <figcaption className="pt-2 text-xs text-muted-foreground">\n          <span className="font-semibold text-foreground">{artwork.artist}</span>\n        </figcaption>\n      </figure>\n    ))}\n  </div>\n</ScrollArea>`}
    >
      <ScrollArea className="w-96 whitespace-nowrap rounded-md border" orientation="horizontal">
        <div className="flex w-max space-x-4 p-4">
          {[
            { artist: 'Monet', art: 'Water Lilies' },
            { artist: 'Van Gogh', art: 'Starry Night' },
            { artist: 'Picasso', art: 'Guernica' },
            { artist: 'Da Vinci', art: 'Mona Lisa' },
            { artist: 'Vermeer', art: 'Girl with Pearl' },
            { artist: 'Rembrandt', art: 'Night Watch' },
          ].map((artwork) => (
            <figure key={artwork.artist} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <div className="h-[150px] w-[200px] bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  {artwork.art}
                </div>
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{artwork.artist}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea>
    </ShowcaseCard>
  </div>
);

export default ScrollAreaPage;
