import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import { Sheet } from "@components/ui/sheet/Sheet";
import { Button } from "@components/ui/button/Button";
import { Input } from "@components/ui/input/Input";

const SheetPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Sheet" description="A side panel that slides in from the edge of the screen (extends Drawer)." />

    <ShowcaseCard
      title="Default (Right)"
      code={`<Sheet\n  trigger={<Button variant="outline">Open Sheet</Button>}\n  title="Edit Profile"\n  description="Make changes to your profile here."\n>\n  <div className="space-y-4">\n    <Input label="Name" placeholder="Enter your name" />\n    <Input label="Email" placeholder="Enter your email" />\n  </div>\n</Sheet>`}
    >
      <Sheet
        trigger={<Button variant="outline">Open Sheet</Button>}
        title="Edit Profile"
        description="Make changes to your profile here."
        footerContent={
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Name" placeholder="Enter your name" />
          <Input label="Email" placeholder="Enter your email" />
        </div>
      </Sheet>
    </ShowcaseCard>

    <ShowcaseCard
      title="Left Side"
      code={`<Sheet direction="left" trigger={<Button variant="outline">Left Sheet</Button>} title="Navigation">\n  <p>Sheet content here</p>\n</Sheet>`}
    >
      <Sheet
        direction="left"
        trigger={<Button variant="outline">Left Sheet</Button>}
        title="Navigation"
      >
        <p className="text-sm text-muted-foreground">Navigation content here.</p>
      </Sheet>
    </ShowcaseCard>
  </div>
);

export default SheetPage;
