from typing import TypedDict

from langgraph.graph import StateGraph

from paper_agent import search_papers

from agents import (
    planner_agent,
    writer_agent
)

from search_agent import web_search


class ResearchState(TypedDict):
    topic: str
    depth: str
    plan: str
    web_data: list
    papers: list
    report: str


def planner_node(state):

    state["plan"] = planner_agent(
        state["topic"]
    )

    return state


def web_node(state):

    state["web_data"] = web_search(
        state["topic"],
        state["depth"]
    )

    print("\nWEB NODE OUTPUT:")
    print(state["web_data"])

    return state


def paper_node(state):

    state["papers"] = search_papers(
        state["topic"],
        state["depth"]
    )

    return state


def writer_node(state):

    web_text = "\n".join(
        [
            f"{item.get('title', '')} - {item.get('description', '')}"
            for item in state["web_data"]
        ]
    )

    report = writer_agent(
        state["topic"],
        state["plan"],
        web_text,
        state["papers"]
    )

    references = "\n\n# References\n\n"

    for i, source in enumerate(
        state["web_data"],
        start=1
    ):
        references += (
            f"[{i}] {source.get('title', '')}\n"
            f"{source.get('url', '')}\n\n"
        )

    start_index = len(
        state["web_data"]
    ) + 1

    for j, paper in enumerate(
        state["papers"],
        start=start_index
    ):
        references += (
            f"[{j}] {paper.get('title', '')}\n"
            f"{paper.get('url', '')}\n\n"
        )

    state["report"] = (
        report + references
    )

    return state


builder = StateGraph(
    ResearchState
)

builder.add_node(
    "planner",
    planner_node
)

builder.add_node(
    "web",
    web_node
)

builder.add_node(
    "paper",
    paper_node
)

builder.add_node(
    "writer",
    writer_node
)

builder.set_entry_point(
    "planner"
)

builder.add_edge(
    "planner",
    "web"
)

builder.add_edge(
    "web",
    "paper"
)

builder.add_edge(
    "paper",
    "writer"
)

graph = builder.compile()