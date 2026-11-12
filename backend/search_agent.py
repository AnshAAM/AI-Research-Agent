from ddgs import DDGS


def web_search(
    topic,
    depth="Standard"
):

    results = []

    if depth == "Quick":
        max_results = 3

    elif depth == "Deep":
        max_results = 10

    else:
        max_results = 5

    try:

        with DDGS() as ddgs:

            search_results = list(
                ddgs.text(
                    topic,
                    max_results=max_results
                )
            )

            print("\nSEARCH RESULTS:")
            print(search_results)

            for item in search_results:

                results.append(
                    {
                        "title": item.get("title", ""),
                        "description": item.get("body", ""),
                        "url": item.get("href", ""),
                        "type": "Web"
                    }
                )

    except Exception as e:

        print("SEARCH ERROR:", e)

    print("\nWEB RESULTS:")
    print(results)

    return results