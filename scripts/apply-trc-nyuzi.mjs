import fs from "fs";
import path from "path";

const trcRoot = "C:\\Users\\fredj\\OneDrive\\Desktop\\programing\\MyProject\\JavaScript\\our_book_club";

console.log("🚀 Applying Nyuzi to The Reading Circle (our_book_club)...");

// 1. Create nyuzi-comments.tsx
const nyuziCommentsPath = path.join(trcRoot, "src", "components", "blog", "nyuzi-comments.tsx");
const nyuziCommentsContent = `"use client"

import { useEffect } from "react"

interface NyuziCommentsProps {
  blogId: string
  className?: string
}

export function NyuziComments({ blogId, className }: NyuziCommentsProps) {
  // Use canonical production URL so localhost and live site share the exact same comment thread
  const canonicalUrl = \`https://www.readingcircle254.com/blog/\${blogId}\`

  useEffect(() => {
    const scriptId = "nyuzi-embed-script"
    const oldScript = document.getElementById(scriptId)
    if (oldScript) {
      oldScript.remove()
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.src = "https://nyuzi-yap.vercel.app/embed.js"
    script.async = true
    script.setAttribute("data-site-id", "trc254")
    script.setAttribute("data-api", "https://nyuzi-api.fredjuma8.workers.dev")
    script.setAttribute("data-thread-url", canonicalUrl)
    script.setAttribute("data-accent-color", "#15803d") // TRC 254 forest green

    document.body.appendChild(script)

    return () => {
      const activeScript = document.getElementById(scriptId)
      if (activeScript) {
        activeScript.remove()
      }
    }
  }, [canonicalUrl])

  return (
    <div className={className || "w-full mt-4"}>
      <div
        id="nyuzi-comments"
        key={blogId}
        data-site-id="trc254"
        data-thread-url={canonicalUrl}
        className="min-h-[220px]"
      />
    </div>
  )
}
`;

fs.writeFileSync(nyuziCommentsPath, nyuziCommentsContent, "utf-8");
console.log("✅ Created src/components/blog/nyuzi-comments.tsx");

// 2. Update blog-comments-section.tsx
const blogCommentsPath = path.join(trcRoot, "src", "components", "blog", "blog-comments-section.tsx");
const blogCommentsContent = `"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { BlogCommentForm } from "./blog-comment-form"
import { BlogReplySection } from "./blog-reply-section"
import { getBlogCommentsAction } from "@/app/actions/blog-comments"
import { NyuziComments } from "./nyuzi-comments"

// Set to false anytime to instantly revert to Wix CMS comments
const USE_NYUZI = true

interface BlogComment {
  _id: string
  blogId: string
  name: string
  comment: string
  createdAt: string
}

export function BlogCommentsSection({ blogId }: { blogId: string }) {
  if (USE_NYUZI) {
    return <NyuziComments blogId={blogId} />
  }

  const [comments, setComments] = useState<BlogComment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchComments = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getBlogCommentsAction(blogId)
      if (result.success) {
        setComments(result.comments)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
      toast.error("Error", {
        description: "Failed to load comments",
      })
    } finally {
      setIsLoading(false)
    }
  }, [blogId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleCommentPosted = useCallback(() => {
    fetchComments()
  }, [fetchComments])

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <div>
        <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 font-serif mb-6">Comments & Discussion</h3>
        <BlogCommentForm blogId={blogId} onCommentPosted={handleCommentPosted} />
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-gray-600 dark:text-gray-400 italic">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="space-y-4">
              <BlogReplySection
                commentId={comment._id}
                blogId={blogId}
                authorName={comment.name}
                commentText={comment.comment}
                commentCreatedAt={comment.createdAt}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 italic">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  )
}
`;

fs.writeFileSync(blogCommentsPath, blogCommentsContent, "utf-8");
console.log("✅ Updated src/components/blog/blog-comments-section.tsx (with USE_NYUZI = true)");

// 3. Fix BULLETED_LIST in wix-rich-text-renderer.tsx
const rendererPath = path.join(trcRoot, "src", "components", "blog", "wix-rich-text-renderer.tsx");
if (fs.existsSync(rendererPath)) {
  let rendererContent = fs.readFileSync(rendererPath, "utf-8");

  // Add BULLETED_LIST and NUMBERED_LIST to ListNode type
  rendererContent = rendererContent.replace(
    'type: "ORDERED_LIST" | "UNORDERED_LIST"',
    'type: "ORDERED_LIST" | "UNORDERED_LIST" | "BULLETED_LIST" | "NUMBERED_LIST"'
  );

  // In renderListNode handle NUMBERED_LIST
  rendererContent = rendererContent.replace(
    'const ListTag = node.type === "ORDERED_LIST" ? "ol" : "ul"',
    'const isOrdered = node.type === "ORDERED_LIST" || (node.type as string) === "NUMBERED_LIST";\n  const ListTag = isOrdered ? "ol" : "ul"'
  );
  rendererContent = rendererContent.replace(
    'const listClass = node.type === "ORDERED_LIST" ? "list-decimal" : "list-disc"',
    'const listClass = isOrdered ? "list-decimal" : "list-disc"'
  );

  // In renderNode switch case
  rendererContent = rendererContent.replace(
    `    case "ORDERED_LIST":
    case "UNORDERED_LIST":
      return renderListNode(node as ListNode, index)`,
    `    case "ORDERED_LIST":
    case "NUMBERED_LIST":
    case "UNORDERED_LIST":
    case "BULLETED_LIST":
      return renderListNode(node as ListNode, index)`
  );

  fs.writeFileSync(rendererPath, rendererContent, "utf-8");
  console.log("✅ Fixed BULLETED_LIST handling in src/components/blog/wix-rich-text-renderer.tsx");
}

console.log("🎉 Integration complete! Ready to view on localhost:3000");
