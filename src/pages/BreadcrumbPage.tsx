import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@components/ui/breadcrumb/Breadcrumb";
import { Slash } from "lucide-react";

const BreadcrumbPage_ = () => (
  <div className="max-w-4xl">
    <PageHeader title="Breadcrumb" description="Displays the path to the current resource using a hierarchy of links." />

    <ShowcaseCard
      title="Default"
      code={`<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/components">Components</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </ShowcaseCard>

    <ShowcaseCard
      title="Custom Separator"
      code={`<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator>\n      <Slash className="w-3.5 h-3.5" />\n    </BreadcrumbSeparator>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/components">Components</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator>\n      <Slash className="w-3.5 h-3.5" />\n    </BreadcrumbSeparator>\n    <BreadcrumbItem>\n      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="w-3.5 h-3.5" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="w-3.5 h-3.5" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </ShowcaseCard>

    <ShowcaseCard
      title="With Ellipsis (Collapsed)"
      code={`<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbEllipsis />\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/docs/ui">UI</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/ui">UI</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </ShowcaseCard>
  </div>
);

export default BreadcrumbPage_;
