import arxiv


def search_papers(
    topic,
    depth="Standard"
):

    papers = []

    if depth == "Quick":
        max_results = 2

    elif depth == "Deep":
        max_results = 10

    else:
        max_results = 5

    client = arxiv.Client()

    search = arxiv.Search(
        query=topic,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.Relevance
    )

    for result in client.results(search):

        papers.append(
            {
                "title": result.title,
                "authors": [
                    author.name
                    for author in result.authors
                ],
                "summary": result.summary[:300],
                "url": result.entry_id
            }
        )

    return papers