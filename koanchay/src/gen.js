function execute(url, page) {
    if (!page) page = '0';
    let response = fetch(url, {
        method: "GET",
        queries: {"start": page, "vo": 1}
    });

    if (response.ok) {
        let doc = response.html()

        if (doc.select("[name=code]").length > 0) {
            return Response.error("Bạn phải nhập mã eden để có thể đọc.");
        } else if (doc.select("[data-action=login]").length > 0) {
            return Response.error("Bạn phải đăng nhập để có thể đọc.");
        }

        var next = doc.select(".pagination").select("li.active + li").select("a").attr("href").match(/start=(\d+)/);
        if (next) next = next[1]

        let el = doc.select(".book-list > .book-item")

        let data = [];
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select(".book-title").text(),
                link: e.select(".info-col > a").first().attr("href"),
                cover: e.select(".cover-col img").attr("src"),
                description: e.select(".book-author").text(),
                host: "https://koanchay.com"
            })
        }

        return Response.success(data, next);
    }

    return null;
}