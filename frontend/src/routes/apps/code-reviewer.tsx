import { createFileRoute } from '@tanstack/react-router';
import { Code2 } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/code-reviewer')({
  component: CodeReviewer,
});

function CodeReviewer() {
  return (
    <TextToolApp
      title="Code Reviewer"
      description="Get a quick code review — bugs, edge cases, security issues and improvements — from a local model."
      icon={Code2}
      system="You are a senior software engineer performing a code review. Identify bugs, security issues, edge cases, and suggest concrete improvements. Be concise and use bullet points. Reference the code with short snippets when helpful. If the code looks fine, say so briefly."
      inputLabel="Code to review"
      placeholder="Paste a function, class, or file…"
      runLabel="Review"
      outputLabel="Review notes"
      accent="#f59e0b"
      examples={[
        {
          label: 'JS pricing bug',
          text: `function getDiscountedPrice(price, discount) {
  // discount is a percentage like 20
  const final = price - price * discount;
  return final.toFixed(2);
}`,
        },
        {
          label: 'Python endpoint',
          text: `@app.route("/users/<id>")
def get_user(id):
    query = "SELECT * FROM users WHERE id = " + id
    row = db.execute(query).fetchone()
    return jsonify(dict(row))`,
        },
      ]}
    />
  );
}
