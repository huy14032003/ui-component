import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { AspectRatio } from "@components/ui/aspect-ratio/AspectRatio";

const AspectRatioPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Aspect Ratio" description="Displays content within a desired ratio." />

    <ShowcaseCard
      title="16:9 Ratio"
      code={`<AspectRatio ratio={16 / 9}>\n  <img src="..." className="h-full w-full rounded-md object-cover" />\n</AspectRatio>`}
    >
      <div className="w-[450px]">
        <AspectRatio ratio={16 / 9}>
          <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm">
            16:9
          </div>
        </AspectRatio>
      </div>
    </ShowcaseCard>

    <ShowcaseCard
      title="Different Ratios"
      code={`<AspectRatio ratio={1}>{/* 1:1 */}</AspectRatio>\n<AspectRatio ratio={4 / 3}>{/* 4:3 */}</AspectRatio>\n<AspectRatio ratio={21 / 9}>{/* 21:9 */}</AspectRatio>`}
    >
      <div className="grid grid-cols-3 gap-4 w-full">
        <div>
          <AspectRatio ratio={1}>
            <div className="flex h-full w-full items-center justify-center rounded-md bg-primary/10 text-primary text-sm font-medium">1:1</div>
          </AspectRatio>
        </div>
        <div>
          <AspectRatio ratio={4 / 3}>
            <div className="flex h-full w-full items-center justify-center rounded-md bg-success/10 text-success text-sm font-medium">4:3</div>
          </AspectRatio>
        </div>
        <div>
          <AspectRatio ratio={21 / 9}>
            <div className="flex h-full w-full items-center justify-center rounded-md bg-warning/10 text-warning text-sm font-medium">21:9</div>
          </AspectRatio>
        </div>
      </div>
    </ShowcaseCard>
  </div>
);

export default AspectRatioPage;
