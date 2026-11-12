from llm import generate_response


def planner_agent(topic):

    prompt = f"""
Create a detailed research plan for:

{topic}

Include:

1. Main Topics
2. Subtopics
3. Important Research Questions

Keep the plan concise and structured.
"""

    return generate_response(prompt)


def writer_agent(
    topic,
    plan,
    web_data,
    papers
):

    paper_text = "\n".join(
        [
            f"- {paper['title']}"
            for paper in papers[:5]
        ]
    )

    web_text = web_data[:2000]
    plan_text = plan[:800]

    prompt = f"""
You are a Senior Research Analyst.

TOPIC:
{topic}

RESEARCH PLAN:
{plan_text}

WEB RESEARCH:
{web_text}

ACADEMIC PAPERS:
{paper_text}

Generate a professional research report.

Requirements:

- Professional tone
- Detailed analysis
- Markdown formatting
- 800-1200 words
- Use evidence-based reasoning
- Mention academic papers where relevant
- Include insights and recommendations
- Avoid repetition

Structure:

# Executive Summary

# Introduction

# Background and Context

# Key Findings

# Current Trends

# Challenges and Risks

# Opportunities

# Expert Insights

# Future Outlook

# Conclusion

# Key Takeaways

Provide 5-10 bullet points.
"""

    try:

        result = generate_response(prompt)

        if not result:
            return "# Report Generation Failed\n\nNo response returned from Gemini."

        return result

    except Exception as e:

        print("WRITER AGENT ERROR:", e)

        return f"""
# Research Report

Topic: {topic}

Error:
{str(e)}
"""
    

def chat_agent(
    question,
    report,
    sources,
    papers
):

    source_text = "\n".join(
        [
            f"{item.get('title', '')}"
            for item in sources
        ]
    )

    paper_text = "\n".join(
        [
            paper.get("title", "")
            for paper in papers
        ]
    )

    prompt = f"""
You are an AI Research Assistant.

Use the research report,
web sources,
and academic papers
to answer the user's question.

RESEARCH REPORT:

{report[:6000]}

WEB SOURCES:

{source_text[:2000]}

ACADEMIC PAPERS:

{paper_text[:2000]}

USER QUESTION:

{question}

Instructions:

- Answer clearly
- Use information from the report
- Mention papers if relevant
- If asked to summarize, summarize
- If asked to explain for beginners, simplify the explanation
- Use markdown formatting
"""

    return generate_response(prompt)