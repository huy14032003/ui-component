import * as React from 'react';
import { PageHeader, ShowcaseCard } from "@components/ui/Showcase";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
} from "@components/ui/dropdown-menu/DropdownMenu";
import { Button } from "@components/ui/button/Button";
import { Cloud, CreditCard, LogOut, Mail, Plus, Settings, User, UserPlus, Users } from "lucide-react";

const CheckboxDemo = () => {
  const [showStatus, setShowStatus] = React.useState(true);
  const [showActivity, setShowActivity] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Options</Button>} />
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
          Activity Bar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const RadioDemo = () => {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Panel Position</Button>} />
      <DropdownMenuContent>
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownMenuPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Dropdown Menu" description="Displays a menu to the user — such as a set of actions or functions." />

    <ShowcaseCard
      title="Default"
      code={`<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuLabel>My Account</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuGroup>\n      <DropdownMenuItem>\n        <User className="mr-2 h-4 w-4" /> Profile\n        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>\n      </DropdownMenuItem>\n      <DropdownMenuItem>\n        <CreditCard className="mr-2 h-4 w-4" /> Billing\n        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>\n      </DropdownMenuItem>\n      <DropdownMenuItem>\n        <Settings className="mr-2 h-4 w-4" /> Settings\n        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>\n      </DropdownMenuItem>\n    </DropdownMenuGroup>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>\n      <LogOut className="mr-2 h-4 w-4" /> Log out\n      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>\n    </DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" /> Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" /> Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" /> Team
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" /> Invite users
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" /> Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" /> More...
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Cloud className="mr-2 h-4 w-4" /> API
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" /> Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ShowcaseCard>

    <ShowcaseCard
      title="Checkbox Items"
      code={`const [showStatus, setShowStatus] = React.useState(true);\nconst [showActivity, setShowActivity] = React.useState(false);\n\n<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="outline">Options</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Appearance</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>\n      Status Bar\n    </DropdownMenuCheckboxItem>\n    <DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>\n      Activity Bar\n    </DropdownMenuCheckboxItem>\n  </DropdownMenuContent>\n</DropdownMenu>`}
    >
      <CheckboxDemo />
    </ShowcaseCard>

    <ShowcaseCard
      title="Radio Group Items"
      code={`const [position, setPosition] = React.useState('bottom');\n\n<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="outline">Panel Position</Button>} />\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>\n      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>\n      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>\n      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>\n    </DropdownMenuRadioGroup>\n  </DropdownMenuContent>\n</DropdownMenu>`}
    >
      <RadioDemo />
    </ShowcaseCard>
  </div>
);

export default DropdownMenuPage;
