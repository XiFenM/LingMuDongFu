import { getSiteContent } from "@/lib/content";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  const site = getSiteContent();

  return (
    <HeaderClient
      brandName={site.brandName}
      nav={site.nav}
      github={site.github}
      linkedin={site.linkedin}
      resumeLabel={site.resumeLabel}
    />
  );
}
