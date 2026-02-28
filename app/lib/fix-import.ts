export function fixImport(content: string): string {
  const regex
    = /@\/[^/]+\/((?:.*?\/)?(?:components|ui|composables|lib))\/([\w-]+)/g;

  const replacement = (match: string, type: string, component: string) => {
    if (type.endsWith("components")) {
      return `@/components/${component}`;
    }
    else if (type.endsWith("ui")) {
      return `@/components/ui/${component}`;
    }
    else if (type.endsWith("composables")) {
      return `@/composables/${component}`;
    }
    else if (type.endsWith("lib")) {
      return `@/lib/${component}`;
    }

    return match;
  };

  return content.replace(regex, replacement);
}
