from playwright.sync_api import expect


class TestPortfolioContent:
    def test_portfolio_cards_render_from_json(self, page, to_site_path):
        page.goto(to_site_path("/portfolio.html"))
        cards = page.locator("#portfolio-cards .card")
        expect(cards.first).to_be_visible()
        assert cards.count() >= 7

    def test_portfolio_cards_include_what_why_how_fields(self, page, to_site_path):
        page.goto(to_site_path("/portfolio.html"))
        first = page.locator("#portfolio-cards .card").first
        expect(first).to_contain_text("How it's built:")
        expect(first).to_contain_text("What was tested:")
        expect(first).to_contain_text("Why it matters:")
