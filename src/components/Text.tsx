import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/useCopy";
import type { CopyKey } from "@/utils/content";

type ElementTag = keyof JSX.IntrinsicElements;

export type TextProps<T extends ElementTag = "span"> = {
  id: CopyKey | string;
  as?: T;
  className?: string;
  markdown?: boolean;
  defaultText?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const renderMarkdown = (value: string) => {
  let output = escapeHtml(value);
  output = output.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/\*(.+?)\*/g, "<em>$1</em>");
  output = output.replace(/`(.+?)`/g, "<code>$1</code>");
  output = output.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  output = output.replace(/\n/g, "<br />");
  return output;
};

const Text = <T extends ElementTag = "span">({
  as,
  id,
  className,
  markdown,
  defaultText = "",
  ...rest
}: TextProps<T>) => {
  const { t } = useCopy();
  const Component = (as ?? "span") as ElementTag;
  const content = t(id, defaultText);

  if (markdown) {
    return (
      <Component
        {...(rest as ComponentPropsWithoutRef<ElementTag>)}
        className={cn(className, "text-balance")}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
    );
  }

  return (
    <Component {...(rest as ComponentPropsWithoutRef<ElementTag>)} className={className}>
      {content}
    </Component>
  );
};

export default Text;
