/**
 * blogRenderer.js
 * Parses markdown syntax and allows custom HTML media tags (iframes, videos, audio)
 * to render rich, interactive article content.
 */

export const renderRichContent = (text) => {
  if (!text) return "";

  // Escape basic script tags to prevent XSS while allowing rich media embeds
  let safeText = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // 1. Process Markdown Elements
  let formatted = safeText
    // Markdown links: [anchor](url)
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Markdown bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Markdown italic: *text*
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Markdown code block: ```language ... ```
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background-color: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 14px; overflow-x: auto; margin: 16px 0; border: 1px solid rgba(128, 128, 128, 0.2);"><code class="language-$1">$2</code></pre>')
    // Markdown inline code: `code`
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Markdown images: ![alt](url)
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 8px; margin: 16px 0; display: block;" />')
    // Markdown headers: ### text
    .replace(/^### (.*?)$/gm, '<h3 style="font-weight: 800; font-size: 1.3rem; margin-top: 24px; margin-bottom: 12px;">$1</h3>')
    // Markdown headers: ## text
    .replace(/^## (.*?)$/gm, '<h2 style="font-weight: 800; font-size: 1.6rem; margin-top: 28px; margin-bottom: 14px;">$1</h2>')
    // Markdown headers: # text
    .replace(/^# (.*?)$/gm, '<h1 style="font-weight: 800; font-size: 1.9rem; margin-top: 32px; margin-bottom: 16px;">$1</h1>')
    // Markdown horizontal rule: ---
    .replace(/^---$/gm, '<hr style="border: 0; border-top: 1px solid; border-color: rgba(128, 128, 128, 0.2); margin: 24px 0;" />');

  // 2. Wrap non-block lines in paragraphs
  const blocks = formatted.split(/\n\n+/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      
      // If block starts with a standard HTML block tag, render directly
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<img") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<iframe") ||
        trimmed.startsWith("<video") ||
        trimmed.startsWith("<audio") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<section") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<code")
      ) {
        return trimmed;
      }
      
      return `<p style="margin-bottom: 1.25rem; text-align: justify;">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .filter(Boolean)
    .join("");
};

export default renderRichContent;
